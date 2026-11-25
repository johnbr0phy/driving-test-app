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
 *      (the Action passes 300 a week)
 * Without FIREBASE_SERVICE_ACCOUNT_KEY only steps 3 (registry part) and 4 run.
 * --signals runs steps 1 and 2 only: the daily run, so a new flag or report is
 * checked the morning after it appears instead of the next Monday.
 *
 * Every flagged or reported question the judge rules on gets a review in
 * questionFlagReviews/{examId} (verdict, reason, answers at the time). A flag
 * reviewed "ok" is cleared on /admin and not sent again until its answers
 * double or 180 days pass (reviewFresh in lib/questionQuality.ts). A verdict
 * too unsure to be a finding keeps the question as it is. A question with an
 * open finding is not judged again.
 *
 * Nobody reviews any of this by hand. A report is judged once and closed: "ok"
 * (or a low-confidence doubt) closes it with a "the key is right" reply, a
 * finding closes it when the fix merges (--resolve) with a "fixed" reply, or a
 * "right" reply when the fix run checked the source and kept the key
 * (lib/server/reportClose.ts; /api/cron/report-replies sends the emails).
 * Findings the fix run did not settle are carried into the next run's report
 * (attempts on the finding doc); after MAX_ATTEMPTS they are closed with the
 * question kept as it is.
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
import { SIGN_BY_QUESTION_ID, SIGN_DESCRIPTIONS } from "@/lib/signImages";
import { reviewFresh, type FlagReview } from "@/lib/questionQuality";
import { HAIKU_PRICES, PRICES, allowanceUsd, usageCostUsd } from "@/lib/apiBudget";

const MODEL = "claude-opus-5-5";
// The blind first pass: most questions just agree with the key, so the small model does it.
const BLIND_MODEL = "claude-haiku-5-5";
const RECENT_DAYS = 90;
const LETTERS = "ABCDEF";
/** A finding the fix run could not settle this many times is closed, question kept as it is. */
const MAX_ATTEMPTS = 3;

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
// Reports and statistical flags only: no freshness checks, no sweep.
const SIGNALS = args.includes("--signals");
// Writes the findings still open in Firestore to the report files and the log, without calling Claude.
const EXPORT_OPEN = args.includes("--export-open");
const RESOLVE = arg("resolve");

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
  /** v2: the alt text of the figure shown with the question. */
  figure?: string;
  options: string[];
  key: number[] | string[] | null;
  explanation: string;
}

const index: IndexQuestion[] = RESOLVE ? [] : JSON.parse(readFileSync(INDEX, "utf-8"));
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
  /** The exam id the flag or report was filed under (where its pick counts and review live). */
  signalExamId?: string;
  /** Answers the question had when a statistical flag sent it here. */
  n?: number;
}
const queue = new Map<string, QueueItem>();
function enqueue(q: (IndexQuestion & { examId: string }) | undefined, trigger: string, note?: string, signal?: { examId: string; n?: number }) {
  if (!q) return;
  const key = `${q.examId}|${q.id}`;
  const item: QueueItem = queue.get(key) ?? { q, trigger: new Set<string>(), notes: [] };
  item.trigger.add(trigger);
  if (note) item.notes.push(note);
  if (signal) {
    item.signalExamId ??= signal.examId;
    item.n = Math.max(item.n ?? 0, signal.n ?? 0);
  }
  queue.set(key, item);
}

const today = new Date().toISOString().slice(0, 10);

// Closes findings from a reviewed file ([{ id, status: "fixed" | "dismissed", note }]), the same
// write as the Fixed and Not a problem buttons on /admin. Run when the fixes reach main.
if (RESOLVE) {
  if (!db) throw new Error("--resolve needs FIREBASE_SERVICE_ACCOUNT_KEY");
  const rows = JSON.parse(readFileSync(RESOLVE, "utf-8")) as { id: string; status: string; note?: string }[];
  const closedAt = new Date().toISOString();
  let n = 0;
  for (const r of rows) {
    if (r.status !== "fixed" && r.status !== "dismissed") throw new Error(`${r.id}: status must be fixed or dismissed`);
    const ref = db.collection("questionAuditFindings").doc(r.id);
    const snap = await ref.get();
    if (!snap.exists) {
      console.log(`[audit] ${r.id}: no such finding, skipped`);
      continue;
    }
    await ref.update({ status: r.status, closedAt, closedNote: r.note ?? "" });
    if (r.status === "fixed") {
      // The pick counts describe the old key or wording: start them again, and close the reports it answers.
      const f = snap.data()!;
      const { resetQuestionSignals } = await import("@/lib/server/questionFlagReviews");
      await resetQuestionSignals(db, f.signalExamId || f.examId, f.questionId);
      const { closeQuestionReports } = await import("@/lib/server/reportClose");
      await closeQuestionReports(db, f.questionId, "fixed", "fixed", r.note ?? "Fixed by the question audit.");
    } else {
      const f = snap.data()!;
      const { clearQuestionReview } = await import("@/lib/server/questionFlagReviews");
      await clearQuestionReview(db, f.signalExamId || f.examId, f.questionId, r.note || "Checked in review: not a problem.");
      // Checked against the official source and kept: the reporter hears why the answer stands.
      const { closeQuestionReports } = await import("@/lib/server/reportClose");
      await closeQuestionReports(db, f.questionId, "dismissed", "right", r.note || "Checked against the official source: the key is right.");
    }
    n++;
  }
  console.log(`[audit] closed ${n} of ${rows.length} findings from ${RESOLVE}`);
  return;
}

if (EXPORT_OPEN) {
  if (!db) throw new Error("--export-open needs FIREBASE_SERVICE_ACCOUNT_KEY");
  const snap = await db.collection("questionAuditFindings").where("status", "==", "open").get();
  const open = snap.docs.map((d) => {
    const f = d.data();
    const q = find(f.examId, f.questionId);
    return { ...f, file: q?.file ?? "", question: q ? render(q, true) : "(not in the index)" };
  });
  const text = [
    `# Open question audit findings ${today}`,
    "",
    `${open.length} open.`,
    "",
    ...open.flatMap((f: Record<string, unknown>) => [
      `## ${String(f.verdict).replace("_", " ")}: ${f.examId} ${f.questionId} (${f.confidence})`,
      "",
      `- File: \`${f.file}\``,
      `- Run: ${f.runId}; why it was checked: ${(f.trigger as string[] | undefined)?.join(", ") ?? ""}; blind answer: ${f.modelAnswer || "n/a"}`,
      `- Finding: ${f.reason}`,
      `- Fix: ${f.fix || "(none given)"}`,
      "",
      "```",
      String(f.question),
      "```",
      "",
    ]),
  ].join("\n");
  mkdirSync(OUT, { recursive: true });
  writeFileSync(`${OUT}/${today}-open.json`, JSON.stringify(open, null, 1) + "\n");
  writeFileSync(`${OUT}/${today}-open.md`, text + "\n");
  console.log(text);
  return;
}

const recentCutoff = new Date(Date.now() - RECENT_DAYS * 86_400_000).toISOString();
const auditedAt = new Map<string, string>();
const openFindings = new Map<string, { status: string; verdict: string }>();
const reviews = new Map<string, FlagReview>();
/** Findings an earlier run raised and no fix settled: handed to the fix step again. */
const carried: Record<string, unknown>[] = [];

if (db) {
  const [reports, flagsDoc, log, findings, sources, reviewDocs] = await Promise.all([
    db.collection("questionReports").where("status", "==", "open").limit(500).get(),
    db.doc("globalStats/questionFlags").get(),
    db.collection("questionAuditLog").get(),
    db.collection("questionAuditFindings").get(),
    db.collection("sourceWatch").where("changed", "==", true).select("exams").get(),
    db.collection("questionFlagReviews").get(),
  ]);
  for (const d of reviewDocs.docs) for (const [id, r] of Object.entries(d.data())) reviews.set(`${d.id}|${id}`, r as FlagReview);
  // A question whose finding is still open is waiting for its fix, not for another opinion.
  const awaitingFix = (q: { examId: string; id: string } | undefined) => !!q && openFindings.get(`${q.examId}__${q.id}`)?.status === "open";
  for (const d of log.docs) for (const [id, at] of Object.entries(d.data())) auditedAt.set(`${d.id}|${id}`, at as string);
  for (const d of findings.docs) openFindings.set(d.id, { status: d.data().status, verdict: d.data().verdict });
  const { closeQuestionReports } = await import("@/lib/server/reportClose");
  // Open findings no fix settled: retried by the next fix run, then closed with the question kept.
  for (const d of findings.docs) {
    const f = d.data();
    if (f.status !== "open") continue;
    const attempts = (f.attempts as number | undefined) ?? 1;
    if (attempts >= MAX_ATTEMPTS) {
      if (DRY) continue;
      const note = `Not settled after ${attempts} fix runs: no official source confirmed a change, so the question is kept as it is.`;
      await d.ref.update({ status: "dismissed", closedAt: new Date().toISOString(), closedNote: note, gaveUp: true });
      const { clearQuestionReview } = await import("@/lib/server/questionFlagReviews");
      await clearQuestionReview(db, f.signalExamId || f.examId, f.questionId, note);
      // Unsure either way, so no reply that claims the key is right.
      await closeQuestionReports(db, f.questionId, "dismissed", null, note);
      openFindings.set(d.id, { status: "dismissed", verdict: f.verdict });
      continue;
    }
    const q = find(f.examId, f.questionId);
    carried.push({ ...f, id: d.id, attempts, file: q?.file ?? "", question: q ? render(q, true) : "(not in the index)" });
  }
  for (const d of reports.docs) {
    const r = d.data();
    const q = find(r.examId, r.questionId);
    if (!q) {
      // The question left the bank (rewritten or retired): nothing to judge or reply about.
      if (!DRY) await d.ref.update({ status: "dismissed", closedAt: new Date().toISOString(), closedReason: "The question is no longer in the bank." });
      continue;
    }
    if (awaitingFix(q)) continue;
    // Judged since it was made (a report filed before this change, or one the
    // judge saw with another report): close it on that verdict now.
    const review = reviews.get(`${r.examId}|${r.questionId}`);
    if (review && review.at > (r.createdAt ?? "")) {
      if (!DRY && (review.verdict === "ok" || review.confidence === "low")) {
        await closeQuestionReports(db, r.questionId, "dismissed", "right", review.reason || "Checked against the sources: the key is right.");
      }
      continue;
    }
    enqueue(q, "report", `A student reported: ${r.reason}${r.note ? `: "${r.note}"` : ""}`, { examId: r.examId });
  }
  for (const f of (flagsDoc.data()?.flags ?? []).slice(0, MAX_FLAGS)) {
    if (!f.kinds.some((k: string) => k === "keySuspect" || k === "splitAnswer")) continue;
    const q = find(f.examId, f.questionId);
    if (awaitingFix(q) || reviewFresh(reviews.get(`${f.examId}|${f.questionId}`), f.n)) continue;
    enqueue(
      q,
      "stats",
      `Answer statistics: ${f.n} answers, ${f.correctPct}% correct${f.strongCorrectPct !== null ? `, ${f.strongCorrectPct}% among strong students` : ""}${f.topWrong !== null ? `; option ${LETTERS[f.topWrong]} (bank order) is the most picked wrong answer at ${f.topWrongPct}%` : ""}. Flags: ${f.kinds.join(", ")}. A hard question also looks like this, so the statistics alone do not show the key is wrong.`,
      { examId: f.examId, n: f.n },
    );
  }
  const changedExams = new Set(SIGNALS ? [] : sources.docs.flatMap((d) => (d.data().exams as string[]) ?? []));
  for (const exam of changedExams) addFresh(exam, "source", "An official source page for this exam changed recently; check the question is still correct.");
}

// Dated changes due within 60 days, or already past and not marked done.
const soon = new Date(Date.now() + 60 * 86_400_000).toISOString().slice(0, 10);
for (const e of FRESHNESS.events as { exam: string; date: string; done?: string; what: string }[]) {
  if (!SIGNALS && !e.done && e.date <= soon) addFresh(e.exam, "freshness", `Upcoming or past change to the real exam (${e.date}): ${e.what}`);
}
function addFresh(examId: string, trigger: string, note: string) {
  const items = [...byKey.values()].filter((q) => q.examId === examId && VOLATILE.test(`${q.stem} ${q.options.join(" ")} ${q.explanation}`));
  for (const q of items.slice(0, Math.ceil(MAX_FRESH / 4))) enqueue(q, trigger, note);
}

// Random sweep, stable per day, skipping anything audited recently.
const pool = [...byKey.values()].filter((q) => choiceFormat(q) && !queue.has(`${q.examId}|${q.id}`) && (auditedAt.get(`${q.examId}|${q.id}`) ?? "") < recentCutoff);
const seeded = (s: string) => createHash("sha1").update(`${today}:${s}`).digest("hex");
pool.sort((a, b) => seeded(a.id).localeCompare(seeded(b.id)));
for (const q of pool.slice(0, SIGNALS ? 0 : SWEEP)) enqueue(q, "sweep");

console.log(`[audit] ${index.length} questions indexed, ${queue.size} queued (${[...queue.values()].filter((i) => !i.trigger.has("sweep")).length} from reports, stats and freshness)`);
if (!queue.size && !carried.length && !DRY) {
  console.log("[audit] nothing new to check");
  return;
}
if (DRY) {
  for (const i of [...queue.values()].slice(0, 20)) console.log(`  ${i.q.examId} ${i.q.id} [${[...i.trigger].join(",")}]`);
  return;
}

// ── Claude ──────────────────────────────────────────────────────────────────
const client = new Anthropic();

// ── API budget (lib/apiBudget.ts) ───────────────────────────────────────────
// Reports, flags and freshness are queued before the sweep, so they get the budget first.
const { readSpend, recordSpend } = await import("@/lib/server/apiBudget");
const RUN_CAP_USD = SIGNALS ? 1 : 3;
let budgetUsd = 0;
try {
  // Without Firestore (a local run) the per-run cap is the only limit.
  budgetUsd = db ? allowanceUsd(await readSpend(db), "question-audit", RUN_CAP_USD) : RUN_CAP_USD;
} catch (err) {
  console.error("[audit] could not read the API budget, auditing nothing:", err);
}
let spentUsd = 0;
console.log(`[audit] API budget for this run: $${budgetUsd.toFixed(2)}`);

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
  // The candidate sees a picture the model cannot: say what it shows.
  if (q.figure) lines.push(`Figure shown with the question (described): ${q.figure}\n`);
  const sign = q.engine === "v1" ? SIGN_BY_QUESTION_ID[q.id] : undefined;
  if (sign) lines.push(`The question shows a picture of a road sign: ${SIGN_DESCRIPTIONS[sign] ?? sign.split("/").pop()!.replace(/-/g, " ")}\n`);
  lines.push(`Question: ${q.stem}`);
  q.options.forEach((o, i) => lines.push(`${LETTERS[i]}) ${o}`));
  if (q.format === "multi") lines.push("(Select all that apply.)");
  if (withKey) {
    const key = (q.key as number[]).map((i) => LETTERS[i]).join(", ");
    lines.push(`\nAnswer key: ${key}`, `Explanation: ${q.explanation}`);
  }
  return lines.join("\n");
}

// Both passes go through the Message Batches API (half price; the audit runs at
// night, so waiting is fine). A batch cannot stop part way, so each pass is
// sized from an estimate before it is sent, and the real cost is added after.
const BATCH_DISCOUNT = 0.5;
/** Estimated cost of one request, batch price, US dollars (sized from past runs, with room to spare). */
const EST_BLIND_USD = 0.002;
const EST_JUDGE_USD = 0.06;
const BATCH_POLL_MS = 30_000;
const BATCH_MAX_WAIT_MS = 90 * 60_000;

interface BatchAsk { id: string; system: string; user: string; schema: object }

async function batchStructured<T>(asks: BatchAsk[], model: string, prices: typeof PRICES, effort: "low" | "medium" | "high"): Promise<Map<string, T>> {
  const out = new Map<string, T>();
  if (!asks.length) return out;
  const batch = await client.beta.messages.batches.create({
    requests: asks.map((a) => ({
      custom_id: a.id,
      params: {
        model,
        max_tokens: 16000,
        output_config: { effort, format: { type: "json_schema", schema: a.schema } },
        system: a.system,
        messages: [{ role: "user", content: a.user }],
      },
    })),
  } as Parameters<typeof client.beta.messages.batches.create>[0]);
  console.log(`[audit] batch ${batch.id}: ${asks.length} requests on ${model}`);
  const started = Date.now();
  let status = batch.processing_status;
  while (status !== "ended") {
    if (Date.now() - started > BATCH_MAX_WAIT_MS) {
      console.error(`[audit] batch ${batch.id} still running after 90 minutes; cancelling, finished requests are kept`);
      await client.beta.messages.batches.cancel(batch.id).catch(() => undefined);
    }
    await new Promise((r) => setTimeout(r, BATCH_POLL_MS));
    status = (await client.beta.messages.batches.retrieve(batch.id)).processing_status;
  }
  for await (const row of await client.beta.messages.batches.results(batch.id)) {
    if (row.result.type !== "succeeded") continue;
    const message = row.result.message;
    spentUsd += usageCostUsd(message.usage, prices) * BATCH_DISCOUNT;
    if (message.stop_reason === "refusal") continue;
    const text = message.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
    try {
      out.set(row.custom_id, JSON.parse(text) as T);
    } catch {
      console.error(`[audit] unreadable answer for ${row.custom_id}`);
    }
  }
  return out;
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
  signalExamId?: string;
  n?: number;
}

function keyOf(q: IndexQuestion): string[] {
  return Array.isArray(q.key) && typeof q.key[0] === "number" ? (q.key as number[]).map((i) => LETTERS[i]) : [];
}

function judgeUser(item: QueueItem, blind: Blind | null, disagreed: boolean): string {
  const { q } = item;
  const evidence = [
    ...item.notes,
    ...(blind && disagreed
      ? [`An independent examiner answering without the key chose ${blind.answer.join(", ") || "nothing"} (${blind.confidence} confidence)${blind.defensibleOthers.length ? `, and thought ${blind.defensibleOthers.join(", ")} also defensible` : ""}${blind.problem ? `. They noted: ${blind.problem}` : ""}.`]
      : []),
  ];
  const sources = sourcesFor(q.examId);
  return [
    `Exam: ${q.examId}. Topic: ${q.category}.`,
    choiceFormat(q) ? render(q, true) : `${render({ ...q, options: [] }, false)}\nAnswer: ${JSON.stringify(q.key)}\nExplanation: ${q.explanation}`,
    `\nWhy it is being reviewed:\n${evidence.map((e) => `- ${e}`).join("\n") || "- Routine check."}`,
    sources ? `\nThe author's sources (sources.md):\n${sources}` : "",
  ].join("\n");
}

// Signals (reports, flags, freshness) are queued first, so a tight budget keeps them.
const allItems = [...queue.values()];
const isSweepOnly = (i: QueueItem) => i.trigger.size === 1 && i.trigger.has("sweep");
// Room for: a blind answer for every item, and a judge for every signal plus
// an expected 1 in 5 sweep questions that disagree.
const estimate = (i: QueueItem) => EST_BLIND_USD + (isSweepOnly(i) ? EST_JUDGE_USD / 5 : EST_JUDGE_USD);
const items: QueueItem[] = [];
let planned = 0;
for (const i of allItems) {
  if (planned + estimate(i) > budgetUsd) break;
  items.push(i);
  planned += estimate(i);
}
if (items.length < allItems.length) console.log(`[audit] budget covers ${items.length}/${allItems.length} queued questions`);

// Pass 1: the blind answer, on the small model.
const blindAsks: BatchAsk[] = [];
items.forEach((item, n) => {
  if (choiceFormat(item.q) && keyOf(item.q).length) blindAsks.push({ id: `b${n}`, system: BLIND_SYSTEM, user: render(item.q, false), schema: BLIND_SCHEMA });
});
let blinds = new Map<string, Blind>();
try {
  blinds = await batchStructured<Blind>(blindAsks, BLIND_MODEL, HAIKU_PRICES, "low");
} catch (err) {
  console.error(`[audit] blind batch failed: ${err instanceof Error ? err.message : err}`);
}

// Pass 2: the judge, only where a signal or a disagreement calls for one.
const partial = items.map((item, n) => {
  const key = keyOf(item.q);
  const blind = blinds.get(`b${n}`) ?? null;
  const disagreed = !!blind && (!(blind.answer.length === key.length && blind.answer.every((a) => key.includes(a))) || blind.defensibleOthers.length > 0 || blind.problem.trim().length > 0);
  return { item, n, key, blind, disagreed };
});
const judgeAsks: BatchAsk[] = [];
for (const p of partial) {
  if (isSweepOnly(p.item) && !p.disagreed) continue;
  if (spentUsd + (judgeAsks.length + 1) * EST_JUDGE_USD > budgetUsd) {
    console.log(`[audit] budget stops the judge at ${judgeAsks.length} questions`);
    break;
  }
  judgeAsks.push({ id: `j${p.n}`, system: JUDGE_SYSTEM, user: judgeUser(p.item, p.blind, p.disagreed), schema: VERDICT_SCHEMA });
}
let verdicts = new Map<string, Verdict>();
try {
  verdicts = await batchStructured<Verdict>(judgeAsks, MODEL, PRICES, "high");
} catch (err) {
  console.error(`[audit] judge batch failed: ${err instanceof Error ? err.message : err}`);
}

const results: Result[] = partial.map(({ item, n, key, blind, disagreed }) => ({
  examId: item.q.examId,
  questionId: item.q.id,
  file: item.q.file,
  trigger: [...item.trigger],
  notes: item.notes,
  key,
  blind,
  disagreed,
  verdict: verdicts.get(`j${n}`) ?? null,
  signalExamId: item.signalExamId,
  n: item.n,
}));

try {
  if (db) await recordSpend(db, "question-audit", spentUsd);
  console.log(`[audit] spent $${spentUsd.toFixed(2)}`);
} catch (err) {
  console.error("[audit] could not record API spend:", err);
}

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
  blindModel: BLIND_MODEL,
  checked: results.length,
  blindChecked: results.filter((r) => r.blind).length,
  disagreements: results.filter((r) => r.disagreed).length,
  adjudicated: results.filter((r) => r.verdict).length,
  findings: confirmed.length,
  // Flagged or reported questions the judge looked at and found nothing wrong with.
  signalsCleared: results.filter((r) => r.signalExamId && r.verdict?.verdict === "ok").length,
};
// Earlier findings no fix settled go to the fix step again, beside today's.
const carriedFindings = carried.filter((c) => !confirmed.some((r) => `${r.examId}__${r.questionId}` === c.id));
writeFileSync(
  `${OUT}/${today}.json`,
  JSON.stringify({ ...summary, findings: [...confirmed, ...carriedFindings.map((c) => ({ ...c, carried: true }))] }, null, 1) + "\n",
);

const md = [
  `# Question audit ${today}`,
  "",
  `${summary.checked} questions checked (${summary.blindChecked} answered blind, ${summary.disagreements} disagreed with the key or raised a problem, ${summary.adjudicated} reviewed against the key and sources). ${summary.findings} confirmed problems.${summary.signalsCleared ? ` ${summary.signalsCleared} flagged or reported questions were checked and found right.` : ""}`,
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
  ...(carriedFindings.length
    ? [
        "",
        `# Earlier findings not settled yet (${carriedFindings.length})`,
        "",
        `Raised by an earlier run; no fix settled them. Decide each one now. After ${MAX_ATTEMPTS} runs a finding is closed with the question kept as it is.`,
        "",
        ...carriedFindings.flatMap((c) => [
          `## ${String(c.verdict).replace("_", " ")}: ${c.examId} ${c.questionId} (${c.confidence}, attempt ${Number(c.attempts) + 1} of ${MAX_ATTEMPTS})`,
          "",
          `- File: \`${c.file}\``,
          `- Finding: ${c.reason}`,
          `- Fix: ${c.fix || "(none given)"}`,
          "",
          "```",
          String(c.question),
          "```",
          "",
        ]),
      ]
    : []),
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
      ...(r.signalExamId ? { signalExamId: r.signalExamId } : {}),
      runId,
      status: "open",
      createdAt: summary.at,
      attempts: 1,
    });
  }
  // One more fix run is about to see each carried finding.
  for (const c of carriedFindings) batch.update(db.collection("questionAuditFindings").doc(String(c.id)), { attempts: Number(c.attempts) + 1 });
  const log: Record<string, Record<string, string>> = {};
  for (const r of results) (log[r.examId] ??= {})[r.questionId] = summary.at;
  for (const [examId, entries] of Object.entries(log)) batch.set(db.collection("questionAuditLog").doc(examId), entries, { merge: true });
  // What the judge decided on each flagged or reported question: /admin shows it, and an "ok" clears the flag.
  const reviewed: Record<string, Record<string, FlagReview>> = {};
  for (const r of results) {
    if (!r.signalExamId || !r.verdict) continue;
    (reviewed[r.signalExamId] ??= {})[r.questionId] = { at: summary.at, verdict: r.verdict.verdict, confidence: r.verdict.confidence, reason: r.verdict.reason, n: r.n ?? 0, runId };
  }
  for (const [examId, entries] of Object.entries(reviewed)) batch.set(db.collection("questionFlagReviews").doc(examId), entries, { merge: true });
  await batch.commit();
  // Reported questions the judge found right (or could not fault with any
  // confidence): close the reports now, with a reply saying the key stands.
  // A confirmed problem keeps its reports open until the fix merges (--resolve).
  const { closeQuestionReports } = await import("@/lib/server/reportClose");
  let replied = 0;
  for (const r of results) {
    if (!r.trigger.includes("report") || !r.verdict) continue;
    if (r.verdict.verdict !== "ok" && r.verdict.confidence !== "low") continue;
    replied += await closeQuestionReports(db, r.questionId, "dismissed", "right", r.verdict.reason || "Checked against the sources: the key is right.");
  }
  if (replied) console.log(`[audit] closed ${replied} reports on questions found right`);
  console.log(`[audit] saved run ${runId} to Firestore`);
}
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
