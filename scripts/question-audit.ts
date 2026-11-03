/**
 * Weekly question audit: Claude re-answers questions without seeing the key,
 * then checks every disagreement (and every reported or flagged question)
 * against the key, the explanation and the exam's sources.md.
 *
 *   python3 -I tools/check_banks.py --export /tmp/questions.json
 *   npx tsx scripts/question-audit.ts --index /tmp/questions.json [--sweep 300] [--out audits] [--dry-run]
 *
 * The queue, worst first:
 *   1. open "Report this question" reports (questionReports)
 *   2. the nightly statistical flags (globalStats/questionFlags)
 *   3. time-sensitive questions in exams with a dated change due within 60
 *      days (lib/examFreshness.json) or a changed official page (sourceWatch)
 *   4. a random sweep of --sweep questions not audited in the last 90 days
 *      (the Action passes 1,000 a week: each of the ~54,000 choice
 *      questions about once a year)
 * Without FIREBASE_SERVICE_ACCOUNT_KEY only steps 3 (registry part) and 4 run.
 *
 * Writes audits/<date>.json and audits/<date>.md (the PR body the GitHub
 * Action uses), and in Firestore questionAudits/{runId}, one
 * questionAuditFindings/{exam__id} per confirmed problem (shown on the /admin
 * Questions tab) and questionAuditLog/{examId} (when each question was last
 * audited). A finding someone dismissed is not raised again unless the
 * verdict changes. The audit never edits a bank: the Action hands the
 * findings to Claude Code, which fixes the sources and opens a PR for review.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { ALL_EXAMS } from "@/lib/exams";
import FRESHNESS from "@/lib/examFreshness.json";

const MODEL = "claude-opus-5-5";
const CONCURRENCY = 6;
const RECENT_DAYS = 90;
const LETTERS = "ABCDEF";

// ── Arguments ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const arg = (name: string, fallback?: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const INDEX = arg("index", "/tmp/questions.json")!;
const SWEEP = parseInt(arg("sweep", "300")!, 10);
const MAX_FLAGS = parseInt(arg("flags", "150")!, 10);
const MAX_FRESH = parseInt(arg("fresh", "60")!, 10);
const OUT = arg("out", "audits")!;
const DRY = args.includes("--dry-run");

// ── The question index (tools/check_banks.py --export) ──────────────────────
interface IndexQuestion {
  id: string;
  engine: "v1" | "v2";
  exam?: string;
  file: string;
  category: string;
  format?: string;
  stem: string;
  passage?: string;
  options: string[];
  key: number[] | string[] | null;
  explanation: string;
}

const index: IndexQuestion[] = JSON.parse(readFileSync(INDEX, "utf-8"));
const prefixes = ALL_EXAMS.filter((e) => e.questionIdPrefix)
  .map((e) => ({ id: e.id, prefix: e.questionIdPrefix }))
  .sort((a, b) => b.prefix.length - a.prefix.length);
function examOf(q: IndexQuestion): string {
  if (q.engine === "v2") return q.exam!;
  if (q.file === "data/questions.json") return "dmv";
  return prefixes.find((p) => q.id.startsWith(p.prefix))?.id ?? q.file.replace(/^data\/|-questions\.json$/g, "");
}
const byKey = new Map<string, IndexQuestion & { examId: string }>();
for (const q of index) byKey.set(`${examOf(q)}|${q.id}`, { ...q, examId: examOf(q) });
// v1 ids are unique across banks; reports from a state version name the family or the variant.
const byId = new Map<string, IndexQuestion & { examId: string }>();
for (const q of byKey.values()) if (!byId.has(q.id)) byId.set(q.id, q);
const find = (examId: string, id: string) => byKey.get(`${examId}|${id}`) ?? byId.get(id);

/** Formats the blind pass can grade: one or more option picks. */
const choiceFormat = (q: IndexQuestion) => q.engine === "v1" || q.format === "single" || q.format === "multi";

// ── Sources (tools/**/<exam>/sources.md) ────────────────────────────────────
const sourcesFor = (() => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(dir, e.name));
      else if (e.name === "sources.md") files.push(join(dir, e.name));
    }
  };
  walk("tools");
  const map = new Map<string, string>();
  for (const f of files) map.set(f.split("/").slice(-2)[0], f);
  return (examId: string): string => {
    const f = map.get(examId);
    if (!f) return "";
    const text = readFileSync(f, "utf-8");
    return text.length > 8000 ? `${text.slice(0, 8000)}\n[truncated]` : text;
  };
})();

// Facts that go out of date: years, money, limits, "currently", officeholders.
const VOLATILE = /\b(19|20)\d{2}\b|\$|£|€|₹|\bfee\b|\bcurrent(ly)?\b|\bas of\b|\blimit\b|\bpenalt|\bfine[sd]?\b|\bminister\b|\bpresident\b|\bpercent\b|%/i;

async function main() {
// ── Firestore (optional) ────────────────────────────────────────────────────
type Db = import("firebase-admin/firestore").Firestore;
let db: Db | null = null;
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  const { getAdminDb } = await import("@/lib/firebase-admin");
  db = getAdminDb();
}

interface QueueItem {
  q: IndexQuestion & { examId: string };
  trigger: Set<string>;
  notes: string[];
}
const queue = new Map<string, QueueItem>();
function enqueue(q: (IndexQuestion & { examId: string }) | undefined, trigger: string, note?: string) {
  if (!q) return;
  const key = `${q.examId}|${q.id}`;
  const item = queue.get(key) ?? { q, trigger: new Set<string>(), notes: [] };
  item.trigger.add(trigger);
  if (note) item.notes.push(note);
  queue.set(key, item);
}

const today = new Date().toISOString().slice(0, 10);
const recentCutoff = new Date(Date.now() - RECENT_DAYS * 86_400_000).toISOString();
const auditedAt = new Map<string, string>();
const openFindings = new Map<string, { status: string; verdict: string }>();

if (db) {
  const [reports, flagsDoc, log, findings, sources] = await Promise.all([
    db.collection("questionReports").where("status", "==", "open").limit(500).get(),
    db.doc("globalStats/questionFlags").get(),
    db.collection("questionAuditLog").get(),
    db.collection("questionAuditFindings").get(),
    db.collection("sourceWatch").where("changed", "==", true).select("exams").get(),
  ]);
  for (const d of log.docs) for (const [id, at] of Object.entries(d.data())) auditedAt.set(`${d.id}|${id}`, at as string);
  for (const d of findings.docs) openFindings.set(d.id, { status: d.data().status, verdict: d.data().verdict });
  for (const d of reports.docs) {
    const r = d.data();
    enqueue(find(r.examId, r.questionId), "report", `A student reported: ${r.reason}${r.note ? `: "${r.note}"` : ""}`);
  }
  for (const f of (flagsDoc.data()?.flags ?? []).slice(0, MAX_FLAGS)) {
    if (!f.kinds.some((k: string) => k !== "tooEasy")) continue;
    enqueue(
      find(f.examId, f.questionId),
      "stats",
      `Answer statistics: ${f.n} answers, ${f.correctPct}% correct${f.strongCorrectPct !== null ? `, ${f.strongCorrectPct}% among strong students` : ""}${f.topWrong !== null ? `; option ${LETTERS[f.topWrong]} (bank order) is the most picked wrong answer at ${f.topWrongPct}%` : ""}. Flags: ${f.kinds.join(", ")}.`,
    );
  }
  const changedExams = new Set(sources.docs.flatMap((d) => (d.data().exams as string[]) ?? []));
  for (const exam of changedExams) addFresh(exam, "source", "An official source page for this exam changed recently; check the question is still correct.");
}

// Dated changes due within 60 days, or already past and not marked done.
const soon = new Date(Date.now() + 60 * 86_400_000).toISOString().slice(0, 10);
for (const e of FRESHNESS.events as { exam: string; date: string; done?: string; what: string }[]) {
  if (!e.done && e.date <= soon) addFresh(e.exam, "freshness", `Upcoming or past change to the real exam (${e.date}): ${e.what}`);
}
function addFresh(examId: string, trigger: string, note: string) {
  const items = [...byKey.values()].filter((q) => q.examId === examId && VOLATILE.test(`${q.stem} ${q.options.join(" ")} ${q.explanation}`));
  for (const q of items.slice(0, Math.ceil(MAX_FRESH / 4))) enqueue(q, trigger, note);
}

// Random sweep, stable per day, skipping anything audited recently.
const pool = [...byKey.values()].filter((q) => choiceFormat(q) && !queue.has(`${q.examId}|${q.id}`) && (auditedAt.get(`${q.examId}|${q.id}`) ?? "") < recentCutoff);
const seeded = (s: string) => createHash("sha1").update(`${today}:${s}`).digest("hex");
pool.sort((a, b) => seeded(a.id).localeCompare(seeded(b.id)));
for (const q of pool.slice(0, SWEEP)) enqueue(q, "sweep");

console.log(`[audit] ${index.length} questions indexed, ${queue.size} queued (${[...queue.values()].filter((i) => !i.trigger.has("sweep")).length} from reports, stats and freshness)`);
if (DRY) {
  for (const i of [...queue.values()].slice(0, 20)) console.log(`  ${i.q.examId} ${i.q.id} [${[...i.trigger].join(",")}]`);
  return;
}

// ── Claude ──────────────────────────────────────────────────────────────────
const client = new Anthropic();

const BLIND_SCHEMA = {
  type: "object",
  properties: {
    answer: { type: "array", items: { type: "string", enum: [...LETTERS] }, description: "The letter(s) of the correct option(s)." },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    defensibleOthers: { type: "array", items: { type: "string", enum: [...LETTERS] }, description: "Other options a well-prepared candidate could defend as correct." },
    problem: { type: "string", description: "Anything wrong with the question itself (empty if none)." },
  },
  required: ["answer", "confidence", "defensibleOthers", "problem"],
  additionalProperties: false,
} as const;

const VERDICT_SCHEMA = {
  type: "object",
  properties: {
    verdict: { type: "string", enum: ["ok", "wrong_key", "ambiguous", "outdated", "unclear", "typo"] },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    correctAnswer: { type: "array", items: { type: "string", enum: [...LETTERS] } },
    reason: { type: "string", description: "Two to four sentences: what is wrong, citing the rule or source." },
    fix: { type: "string", description: "The exact change: new key, rewritten stem or option, or updated explanation. Empty when ok." },
  },
  required: ["verdict", "confidence", "correctAnswer", "reason", "fix"],
  additionalProperties: false,
} as const;

const BLIND_SYSTEM = `You are an expert examiner checking practice questions for a test-prep site. Answer each question as a top candidate would on the real exam, using the rules and facts in force today (${today}) in the jurisdiction the question is about. Then say how sure you are, which other options a well-prepared candidate could also defend, and whether anything is wrong with the question itself: a factual error, two right answers, a missing fact needed to answer, a rule that has changed, or a typo. Do not invent problems; most questions are fine.`;

const JUDGE_SYSTEM = `You review practice exam questions for a test-prep site whose reputation depends on every answer key being right. You are given a question, its answer key and explanation, why it was sent for review, and the sources its author used. Decide, using the rules and facts in force today (${today}):
- ok: the key is right, no other option is defensible, and the explanation is accurate.
- wrong_key: another option is the correct answer.
- ambiguous: more than one option is defensible, or the question lacks a fact needed to answer.
- outdated: the rule, figure or format it tests has changed.
- unclear: the wording would mislead a well-prepared candidate.
- typo: a spelling, grammar or formatting error only.
A student report or a disagreement is evidence to weigh, not proof: students often report questions they simply got wrong. Say "ok" unless you are confident there is a real problem. In fix, give the exact replacement text a builder can apply.`;

function render(q: IndexQuestion, withKey: boolean): string {
  const lines = [];
  if (q.passage) lines.push(`Passage:\n${q.passage}\n`);
  lines.push(`Question: ${q.stem}`);
  q.options.forEach((o, i) => lines.push(`${LETTERS[i]}) ${o}`));
  if (q.format === "multi") lines.push("(Select all that apply.)");
  if (withKey) {
    const key = (q.key as number[]).map((i) => LETTERS[i]).join(", ");
    lines.push(`\nAnswer key: ${key}`, `Explanation: ${q.explanation}`);
  }
  return lines.join("\n");
}

async function structured<T>(system: string, user: string, schema: object, effort: "low" | "medium" | "high"): Promise<T | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 16000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort, format: { type: "json_schema", schema } },
        system,
        messages: [{ role: "user", content: user }],
      } as Parameters<typeof client.beta.messages.create>[0]) as Anthropic.Beta.BetaMessage;
      if (response.stop_reason === "refusal") return null;
      const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
      return JSON.parse(text) as T;
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError || (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500)) {
        await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
        continue;
      }
      console.error(`[audit] request failed: ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }
  return null;
}

interface Blind { answer: string[]; confidence: string; defensibleOthers: string[]; problem: string }
interface Verdict { verdict: string; confidence: string; correctAnswer: string[]; reason: string; fix: string }
interface Result {
  examId: string;
  questionId: string;
  file: string;
  trigger: string[];
  notes: string[];
  key: string[];
  blind: Blind | null;
  disagreed: boolean;
  verdict: Verdict | null;
}

async function audit(item: QueueItem): Promise<Result> {
  const { q } = item;
  const key = Array.isArray(q.key) && typeof q.key[0] === "number" ? (q.key as number[]).map((i) => LETTERS[i]) : [];
  let blind: Blind | null = null;
  let disagreed = false;
  if (choiceFormat(q) && key.length) {
    blind = await structured<Blind>(BLIND_SYSTEM, render(q, false), BLIND_SCHEMA, "low");
    if (blind) {
      const same = blind.answer.length === key.length && blind.answer.every((a) => key.includes(a));
      disagreed = !same || blind.defensibleOthers.length > 0 || blind.problem.trim().length > 0;
    }
  }
  const sweepOnly = item.trigger.size === 1 && item.trigger.has("sweep");
  let verdict: Verdict | null = null;
  if (!sweepOnly || disagreed) {
    const evidence = [
      ...item.notes,
      ...(blind && disagreed
        ? [`An independent examiner answering without the key chose ${blind.answer.join(", ") || "nothing"} (${blind.confidence} confidence)${blind.defensibleOthers.length ? `, and thought ${blind.defensibleOthers.join(", ")} also defensible` : ""}${blind.problem ? `. They noted: ${blind.problem}` : ""}.`]
        : []),
    ];
    const sources = sourcesFor(q.examId);
    const user = [
      `Exam: ${q.examId}. Topic: ${q.category}.`,
      choiceFormat(q) ? render(q, true) : `${render({ ...q, options: [] }, false)}\nAnswer: ${JSON.stringify(q.key)}\nExplanation: ${q.explanation}`,
      `\nWhy it is being reviewed:\n${evidence.map((e) => `- ${e}`).join("\n") || "- Routine check."}`,
      sources ? `\nThe author's sources (sources.md):\n${sources}` : "",
    ].join("\n");
    verdict = await structured<Verdict>(JUDGE_SYSTEM, user, VERDICT_SCHEMA, "high");
  }
  return { examId: q.examId, questionId: q.id, file: q.file, trigger: [...item.trigger], notes: item.notes, key, blind, disagreed, verdict };
}

const items = [...queue.values()];
const results: Result[] = [];
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const item = items[next++];
      results.push(await audit(item));
      if (results.length % 25 === 0) console.log(`[audit] ${results.length}/${items.length}`);
    }
  }),
);

const confirmed = results.filter((r) => r.verdict && r.verdict.verdict !== "ok" && r.verdict.confidence !== "low");
const SEVERITY: Record<string, number> = { wrong_key: 0, outdated: 1, ambiguous: 2, unclear: 3, typo: 4 };
confirmed.sort((a, b) => (SEVERITY[a.verdict!.verdict] ?? 9) - (SEVERITY[b.verdict!.verdict] ?? 9));

// ── Write results ───────────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });
const runId = `${today}-${createHash("sha1").update(String(Date.now())).digest("hex").slice(0, 6)}`;
const summary = {
  runId,
  at: new Date().toISOString(),
  model: MODEL,
  checked: results.length,
  blindChecked: results.filter((r) => r.blind).length,
  disagreements: results.filter((r) => r.disagreed).length,
  adjudicated: results.filter((r) => r.verdict).length,
  findings: confirmed.length,
};
writeFileSync(`${OUT}/${today}.json`, JSON.stringify({ ...summary, findings: confirmed }, null, 1) + "\n");

const md = [
  `# Question audit ${today}`,
  "",
  `${summary.checked} questions checked (${summary.blindChecked} answered blind, ${summary.disagreements} disagreed with the key or raised a problem, ${summary.adjudicated} reviewed against the key and sources). ${summary.findings} confirmed problems.`,
  "",
  ...confirmed.flatMap((r) => [
    `## ${r.verdict!.verdict.replace("_", " ")}: ${r.examId} ${r.questionId} (${r.verdict!.confidence})`,
    "",
    `- File: \`${r.file}\` (fix the source in \`tools/\` when the bank is built from one)`,
    `- Key: ${r.key.join(", ") || "n/a"}${r.verdict!.correctAnswer.length ? `; should be ${r.verdict!.correctAnswer.join(", ")}` : ""}`,
    `- Why it was checked: ${r.trigger.join(", ")}`,
    `- Finding: ${r.verdict!.reason}`,
    `- Fix: ${r.verdict!.fix || "(none given)"}`,
    "",
  ]),
].join("\n");
writeFileSync(`${OUT}/${today}.md`, md + "\n");
console.log(`[audit] ${summary.findings} findings; wrote ${OUT}/${today}.json and ${OUT}/${today}.md`);

if (db) {
  const batch = db.batch();
  batch.set(db.collection("questionAudits").doc(runId), summary);
  for (const r of confirmed) {
    const id = `${r.examId}__${r.questionId}`;
    const prev = openFindings.get(id);
    // A finding someone closed as not a problem stays closed for the same verdict.
    if (prev && prev.status === "dismissed" && prev.verdict === r.verdict!.verdict) continue;
    batch.set(db.collection("questionAuditFindings").doc(id), {
      examId: r.examId,
      questionId: r.questionId,
      verdict: r.verdict!.verdict,
      confidence: r.verdict!.confidence,
      reason: r.verdict!.reason,
      fix: r.verdict!.fix,
      modelAnswer: r.blind?.answer.join(", ") ?? "",
      trigger: r.trigger,
      runId,
      status: "open",
      createdAt: summary.at,
    });
  }
  const log: Record<string, Record<string, string>> = {};
  for (const r of results) (log[r.examId] ??= {})[r.questionId] = summary.at;
  for (const [examId, entries] of Object.entries(log)) batch.set(db.collection("questionAuditLog").doc(examId), entries, { merge: true });
  await batch.commit();
  console.log(`[audit] saved run ${runId} to Firestore`);
}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
