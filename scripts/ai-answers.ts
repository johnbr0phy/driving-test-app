/**
 * AI answer check (lib/aiAnswers.ts, docs/claude/seo.md "AI answer check").
 *
 *   npx tsx scripts/ai-answers.ts --out <dir> [--limit N] [--only id,id]
 *
 * Asks each question in AI_QUESTIONS with web search, records whether the
 * answer names or cites Tigertest, and writes <dir>/<YYYY-MM-DD>.json. With
 * FIREBASE_SERVICE_ACCOUNT_KEY it also checks and records the job's API budget
 * and writes aiAnswerChecks/{date} (the watchdog's heartbeat). A run with no
 * budget left still writes the heartbeat, marked skipped.
 *
 * Needs ANTHROPIC_API_KEY.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import {
  AI_ANSWERS_JOB,
  AI_ANSWERS_MAX_SEARCHES,
  AI_ANSWERS_MODEL,
  AI_QUESTIONS,
  analyzeAnswer,
  summarize,
  type AiAnswerResult,
} from "@/lib/aiAnswers";
import { SONNET_PRICES, allowanceUsd, usageCostUsd } from "@/lib/apiBudget";

/** About 25 questions at $0.05; the cap leaves room for a slow week of long answers. */
const RUN_CAP_USD = 2.5;

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const outDir = flag("out") ?? "ai-answers";
const limit = Number(flag("limit") ?? AI_QUESTIONS.length);
const only = flag("only")?.split(",").filter(Boolean);

// A neutral assistant: the question is what a person would type, and nothing
// here hints at Tigertest, so the answer is what the model would say anyway.
const SYSTEM =
  "You are a helpful assistant. Search the web when it helps you give a current, accurate answer. Recommend specific websites by name where that answers the question, and cite your sources.";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
  const date = new Date().toISOString().slice(0, 10);
  const questions = AI_QUESTIONS.filter((q) => !only || only.includes(q.id)).slice(0, limit);

  let db: import("firebase-admin/firestore").Firestore | null = null;
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const { getAdminDb } = await import("@/lib/firebase-admin");
    db = getAdminDb();
  }
  const { readSpend, recordSpend } = await import("@/lib/server/apiBudget");

  let budgetUsd = RUN_CAP_USD;
  if (db) {
    try {
      budgetUsd = allowanceUsd(await readSpend(db), AI_ANSWERS_JOB, RUN_CAP_USD);
    } catch (error) {
      console.error("[ai-answers] could not read the API budget ledger, skipping:", error);
      budgetUsd = 0;
    }
  }

  const heartbeat = async (doc: Record<string, unknown>) => {
    if (db) await db.doc(`aiAnswerChecks/${date}`).set({ date, at: new Date().toISOString(), model: AI_ANSWERS_MODEL, ...doc });
  };

  if (budgetUsd <= 0) {
    console.log("[ai-answers] no API budget left this month, skipping");
    await heartbeat({ skipped: "budget" });
    return;
  }

  const client = new Anthropic();
  const results: AiAnswerResult[] = [];
  let spentUsd = 0;
  for (const q of questions) {
    if (spentUsd >= budgetUsd - 0.15) {
      console.log(`[ai-answers] stopping at $${spentUsd.toFixed(2)}, the run's allowance is $${budgetUsd.toFixed(2)}`);
      break;
    }
    let costUsd = 0;
    try {
      const messages: Anthropic.Beta.BetaMessageParam[] = [{ role: "user", content: q.text }];
      const content: Anthropic.Beta.BetaContentBlock[] = [];
      // A search can pause the server's loop; resume it a couple of times.
      for (let i = 0; i < 3; i++) {
        const response = await client.beta.messages.create({
          model: AI_ANSWERS_MODEL,
          max_tokens: 4000,
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          output_config: { effort: "low" },
          system: SYSTEM,
          tools: [{ type: "web_search_20260209", name: "web_search", max_uses: AI_ANSWERS_MAX_SEARCHES }],
          messages,
        } as Parameters<typeof client.beta.messages.create>[0]) as Anthropic.Beta.BetaMessage;
        costUsd += usageCostUsd(response.usage, SONNET_PRICES);
        content.push(...response.content);
        if (response.stop_reason === "refusal") throw new Error(`declined (${response.stop_details?.category ?? "no category"})`);
        if (response.stop_reason !== "pause_turn") break;
        messages.push({ role: "assistant", content: response.content });
      }
      const found = analyzeAnswer(content as unknown as Record<string, unknown>[]);
      results.push({ id: q.id, family: q.family, ...found, costUsd: round(costUsd) });
      console.log(
        `[ai-answers] ${q.id}: ${found.mentioned ? "named" : "not named"}, ${found.cited ? `cited #${found.rank}` : "not cited"}${found.inResults ? ", in results" : ""} ($${costUsd.toFixed(3)})`,
      );
      for (const said of found.saidAboutUs ?? []) console.log(`[ai-answers]   says: ${said}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[ai-answers] ${q.id} failed: ${message}`);
      results.push({
        id: q.id, family: q.family, mentioned: false, cited: false, inResults: false, rank: 0,
        ourPaths: [], citedHosts: [], searches: 0, costUsd: round(costUsd), excerpt: "", error: message,
      });
    }
    spentUsd += costUsd;
  }

  const summary = summarize(results);
  const report = { date, model: AI_ANSWERS_MODEL, maxSearches: AI_ANSWERS_MAX_SEARCHES, summary, results };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${date}.json`), JSON.stringify(report, null, 2) + "\n");
  console.log(
    `[ai-answers] ${summary.answered}/${summary.asked} answered, named in ${summary.mentioned}, cited in ${summary.cited}, in results for ${summary.inResults}, $${summary.costUsd.toFixed(2)}`,
  );
  if (summary.foundNotCited.length) console.log(`[ai-answers] found but not cited (make the page answer plainly): ${summary.foundNotCited.join(", ")}`);

  if (db) {
    await recordSpend(db, AI_ANSWERS_JOB, spentUsd);
    // Excerpts stay in the JSON file; the doc keeps what the watchdog and a dashboard need.
    await heartbeat({ summary, results: results.map(({ excerpt: _e, ...r }) => r) });
  }
  if (summary.answered === 0) process.exit(1);
}

function round(n: number) {
  return Math.round(n * 10000) / 10000;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
