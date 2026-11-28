/**
 * Claude API budget for the bot workflows (lib/apiBudget.ts).
 *
 *   npx tsx scripts/api-budget.ts check <job> <perRunCapUsd>
 *     Writes ok=true|false and cap=<usd> to $GITHUB_OUTPUT (and prints them).
 *     cap is what the run may spend: pass it to --max-budget-usd. Fails closed:
 *     if the ledger cannot be read, ok=false.
 *
 *   npx tsx scripts/api-budget.ts record <job> --file <execution.json>
 *   npx tsx scripts/api-budget.ts record <job> --usd <amount>
 *     Adds a run's cost to apiSpend/{YYYY-MM}. --file reads total_cost_usd from
 *     a Claude Code execution file. Never fails the job.
 *
 * Needs FIREBASE_SERVICE_ACCOUNT_KEY.
 */
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { claudeCodeRunCostUsd } from "@/lib/apiBudget";

function output(pairs: Record<string, string>) {
  const lines = Object.entries(pairs).map(([k, v]) => `${k}=${v}`);
  console.log(lines.join("\n"));
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, lines.join("\n") + "\n");
}

const [cmd, job, ...rest] = process.argv.slice(2);
const flag = (name: string) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
};

if (!job || (cmd !== "check" && cmd !== "record")) {
  console.error("usage: api-budget.ts check <job> <perRunCapUsd> | record <job> --file <path> | --usd <n>");
  process.exit(1);
}

async function main() {
  const { getAdminDb } = await import("@/lib/firebase-admin");
  const { recordSpend } = await import("@/lib/server/apiBudget");

  if (cmd === "check") {
    const perRun = Number(rest[0]);
    if (!(perRun > 0)) {
      console.error("perRunCapUsd must be a positive number");
      process.exit(1);
    }
    try {
      const { AiSession } = await import("@/lib/server/ai");
      const cap = await new AiSession(getAdminDb(), job, perRun).allowance();
      if (cap === 0) console.log(`[api-budget] ${job}: no budget left this month, skipping the Claude steps`);
      output({ ok: String(cap > 0), cap: cap.toFixed(2) });
    } catch (error) {
      console.error("[api-budget] could not read the ledger, skipping to stay inside the budget:", error);
      output({ ok: "false", cap: "0" });
    }
  } else {
    let usd = 0;
    const file = flag("file");
    if (file) {
      if (existsSync(file)) {
        try {
          usd = claudeCodeRunCostUsd(JSON.parse(readFileSync(file, "utf8")));
        } catch (error) {
          console.error(`[api-budget] could not read ${file}:`, error);
        }
      } else {
        console.log(`[api-budget] no execution file at ${file}`);
      }
    } else {
      usd = Number(flag("usd") ?? 0);
    }
    try {
      await recordSpend(getAdminDb(), job, usd);
      console.log(`[api-budget] recorded $${usd.toFixed(2)} for ${job}`);
    } catch (error) {
      console.error("[api-budget] could not record spend:", error);
    }
  }
}

main().then(
  () => process.exit(0),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
