/**
 * Does the DMV-style dashboard (Set 1, Test 1, Set 2, Test 2...) get more use
 * than the sets-first layout (all sets, then all tests)?
 *
 * 27 v1 exams switched to the interleaved layout on Oct 22 2026; the rest
 * (CDL, CDL Endorsements, Ham, HTL, EPA 608, state variants, topic-set exams)
 * kept sets first. This reads every account (no guests: their progress is
 * only in their browser) and compares, per exam layout group:
 *
 *  1. All time: of people who used an exam, the share who started / finished
 *     a practice test, and median answers.
 *  2. Before vs after Oct 22: people who first used an exam in a window
 *     before the switch vs a window after it, each followed for FOLLOW_DAYS.
 *     The sets-first group is the control (difference in differences).
 *
 * Read-only. Internal accounts skipped.
 * Run: npx tsx scripts/layout-usage.ts
 */
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { ALL_EXAMS, getExamForTestId, getExamByStateCode, type ExamConfig } from "@/lib/exams";
import { isInternalEmail } from "@/lib/internal";

const SWITCH = Date.parse("2026-10-22T00:00:00Z");
const FOLLOW_DAYS = 7;
const DAY = 86_400_000;
const NOW = Date.now();
// Cohort windows: first use of the exam in [start, end). Each must allow a full follow-up.
const BEFORE = [Date.parse("2026-10-08T00:00:00Z"), SWITCH - FOLLOW_DAYS * DAY + DAY]; // old layout for the whole follow-up
const AFTER = [SWITCH + DAY, NOW - FOLLOW_DAYS * DAY];

type Group = "interleaved" | "setsFirst";
const familyOf = (e: ExamConfig) => e.variantOf ?? e.id;
const groupOf = (e: ExamConfig): Group => (e.trainingSets.some((s) => s.test != null) ? "interleaved" : "setsFirst");

// Longest prefix first so "CDLE-" wins over "CDL-".
const PREFIXES = ALL_EXAMS.filter((e) => e.questionIdPrefix)
  .map((e) => [e.questionIdPrefix, e] as const)
  .sort((a, b) => b[0].length - a[0].length);
const examForQuestion = (qid: string) => PREFIXES.find(([p]) => qid.startsWith(p))?.[1];

const ts = (v: unknown): number | null => {
  if (!v) return null;
  if (typeof v === "number") return v;
  if (typeof v === "string") { const n = Date.parse(v); return Number.isNaN(n) ? null : n; }
  if (typeof v === "object" && v && "toMillis" in v) return (v as { toMillis(): number }).toMillis();
  if (typeof v === "object" && v && "_seconds" in v) return (v as { _seconds: number })._seconds * 1000;
  return null;
};

/** One person's use of one exam. */
type Use = { first: number | null; answers: { t: number | null }[]; testStarts: number[]; testFinishes: number[]; everStarted: boolean; everFinished: boolean };

function usesOf(d: Record<string, unknown>): Map<string, Use> {
  const out = new Map<string, Use>();
  const get = (e: ExamConfig) => {
    const k = e.id;
    if (!out.has(k)) out.set(k, { first: null, answers: [], testStarts: [], testFinishes: [], everStarted: false, everFinished: false });
    return out.get(k)!;
  };
  const touch = (u: Use, t: number | null) => { if (t != null && (u.first == null || t < u.first)) u.first = t; };

  for (const a of (d.trainingAnswerHistory as { questionId?: string; answeredAt?: unknown }[]) ?? []) {
    const e = a?.questionId ? examForQuestion(a.questionId) : undefined;
    if (!e) continue;
    const u = get(e); const t = ts(a.answeredAt);
    u.answers.push({ t }); touch(u, t);
  }
  for (const [id, s] of Object.entries((d.currentTests as Record<string, { startedAt?: unknown; answers?: object }>) ?? {})) {
    const e = getExamForTestId(Number(id));
    if (!e) continue;
    const u = get(e); const t = ts(s?.startedAt);
    u.everStarted = true; if (t != null) u.testStarts.push(t); touch(u, t);
    for (let i = 0; i < Object.keys(s?.answers ?? {}).length; i++) u.answers.push({ t });
  }
  for (const s of (d.completedTests as { id?: unknown; state?: string; startedAt?: unknown; completedAt?: unknown; answers?: { answeredAt?: unknown }[] }[]) ?? []) {
    const e = getExamByStateCode(s?.state) ?? getExamForTestId(Number(s?.id));
    if (!e) continue;
    const u = get(e); const st = ts(s.startedAt); const ct = ts(s.completedAt) ?? st;
    u.everStarted = true; u.everFinished = true;
    if (st != null) u.testStarts.push(st);
    if (ct != null) u.testFinishes.push(ct);
    touch(u, st);
    for (const a of s.answers ?? []) u.answers.push({ t: ts(a?.answeredAt) ?? ct });
  }
  return out;
}

type Agg = { people: number; started: number; finished: number; answers: number[] };
const blank = (): Agg => ({ people: 0, started: 0, finished: 0, answers: [] });
const median = (xs: number[]) => { if (!xs.length) return 0; const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const pct = (n: number, d: number) => (d ? `${((100 * n) / d).toFixed(1)}%` : "-");
const row = (label: string, a: Agg) =>
  `${label.padEnd(28)} ${String(a.people).padStart(6)}  started test ${pct(a.started, a.people).padStart(6)}  finished test ${pct(a.finished, a.people).padStart(6)}  median answers ${median(a.answers)}`;

async function internalUids(): Promise<Set<string>> {
  const out = new Set<string>();
  let token: string | undefined;
  do {
    const page = await getAdminAuth().listUsers(1000, token);
    for (const u of page.users) if (isInternalEmail(u.email)) out.add(u.uid);
    token = page.pageToken;
  } while (token);
  return out;
}

async function main() {
  const skip = await internalUids();
  const allTime: Record<Group, Agg> = { interleaved: blank(), setsFirst: blank() };
  const cohort: Record<Group, Record<"before" | "after", Agg>> = {
    interleaved: { before: blank(), after: blank() },
    setsFirst: { before: blank(), after: blank() },
  };
  const perExam = new Map<string, Agg & { group: Group }>();

  const snap = await getAdminDb().collection("users").select("completedTests", "currentTests", "trainingAnswerHistory").get();
  let scanned = 0;
  for (const doc of snap.docs) {
    if (skip.has(doc.id)) continue;
    scanned++;
    for (const [examId, u] of usesOf(doc.data())) {
      const e = ALL_EXAMS.find((x) => x.id === examId)!;
      const g = groupOf(e);
      const n = u.answers.length;
      if (n === 0 && !u.everStarted) continue;

      for (const a of [allTime[g], (() => {
        const k = familyOf(e);
        if (!perExam.has(k)) perExam.set(k, { ...blank(), group: g });
        return perExam.get(k)!;
      })()]) {
        a.people++; if (u.everStarted) a.started++; if (u.everFinished) a.finished++; a.answers.push(n);
      }

      if (u.first == null) continue;
      const win = u.first >= BEFORE[0] && u.first < BEFORE[1] ? "before" : u.first >= AFTER[0] && u.first < AFTER[1] ? "after" : null;
      if (!win) continue;
      const end = u.first + FOLLOW_DAYS * DAY;
      const c = cohort[g][win];
      c.people++;
      if (u.testStarts.some((t) => t < end)) c.started++;
      if (u.testFinishes.some((t) => t < end)) c.finished++;
      c.answers.push(u.answers.filter((a) => a.t == null || a.t < end).length);
    }
  }

  const d = (x: number) => new Date(x).toISOString().slice(0, 10);
  console.log(`Accounts scanned: ${scanned} (internal skipped: ${skip.size}). Guests not included.\n`);
  console.log("ALL TIME, people who used an exam (v1 registry exams only):");
  console.log(row("Interleaved (Set N, Test N)", allTime.interleaved));
  console.log(row("Sets first, tests at end", allTime.setsFirst));
  console.log(`\nNEW USERS, first ${FOLLOW_DAYS} days on the exam. Before: first use ${d(BEFORE[0])} to ${d(BEFORE[1] - DAY)}. After: ${d(AFTER[0])} to ${d(AFTER[1] - DAY)}.`);
  console.log("Interleaved group (switched Oct 22):");
  console.log(row("  before switch (old layout)", cohort.interleaved.before));
  console.log(row("  after switch (new layout)", cohort.interleaved.after));
  console.log("Sets-first group (control, unchanged):");
  console.log(row("  before", cohort.setsFirst.before));
  console.log(row("  after", cohort.setsFirst.after));
  const rate = (a: Agg) => (a.people ? a.started / a.people : 0);
  const did = (rate(cohort.interleaved.after) - rate(cohort.interleaved.before)) - (rate(cohort.setsFirst.after) - rate(cohort.setsFirst.before));
  console.log(`\nDifference in differences, share starting a test: ${(100 * did).toFixed(1)} points`);

  console.log("\nPER EXAM (all time, 10+ people):");
  [...perExam.entries()].filter(([, a]) => a.people >= 10).sort((a, b) => b[1].people - a[1].people)
    .forEach(([k, a]) => console.log(row(`${k} [${a.group === "interleaved" ? "I" : "S"}]`, a)));
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1); });
