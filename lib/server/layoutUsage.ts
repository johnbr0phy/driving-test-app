import { randomUUID } from "crypto";
import { FieldPath } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS, getExamByStateCode, getExamForTestId, type ExamConfig } from "@/lib/exams";
import { BACK_TO_TOPIC_SETS } from "@/lib/testSetMigration";
import { getInternalUids } from "@/lib/server/internalUsers";
import type { LayoutAgg, LayoutGroup, LayoutUsagePayload } from "@/lib/layoutUsage";

// "Dashboard layout" card on the /admin Growth tab. Do v1 exams laid out like
// the DMV (Set 1, Test 1, Set 2, Test 2...) get more use than the ones that
// list every set first and the tests at the end? 27 exams switched to the
// interleaved layout on Oct 22 2026; the sets-first exams did not change, so
// they are the control. Accounts only (guest progress never leaves the
// browser), internal accounts skipped, DMV and v2 exams out of scope.

export const LAYOUT_SWITCH = "2026-10-22";
const SWITCH = Date.parse(`${LAYOUT_SWITCH}T00:00:00Z`);
const FOLLOW_DAYS = 7;
const DAY = 86_400_000;
const BEFORE_START = Date.parse("2026-10-08T00:00:00Z");

// The interleaved exams went back to topic sets in Nov 2026 (so every set has a
// topic name); they stay in their group here so the Oct 22 comparison holds.
const groupOf = (e: ExamConfig): LayoutGroup =>
  e.trainingSets.some((s) => s.test != null) || BACK_TO_TOPIC_SETS.includes(e.id) ? "interleaved" : "setsFirst";
const familyOf = (e: ExamConfig) => e.variantOf ?? e.id;

// Longest prefix first so "CDLE-" never lands in "CDL-".
const PREFIXES = ALL_EXAMS.filter((e) => e.questionIdPrefix)
  .map((e) => [e.questionIdPrefix, e] as const)
  .sort((a, b) => b[0].length - a[0].length);
const examForQuestion = (qid: string) => PREFIXES.find(([p]) => qid.startsWith(p))?.[1];
const EXAM_BY_ID = new Map(ALL_EXAMS.map((e) => [e.id as string, e]));

function ms(v: unknown): number | null {
  if (!v) return null;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Date.parse(v);
    return Number.isNaN(n) ? null : n;
  }
  if (typeof v === "object" && "toMillis" in v && typeof (v as { toMillis: unknown }).toMillis === "function") {
    return (v as { toMillis(): number }).toMillis();
  }
  if (typeof v === "object" && "_seconds" in v) return (v as { _seconds: number })._seconds * 1000;
  return null;
}

/** One person's use of one exam. */
type Use = { first: number | null; answers: (number | null)[]; starts: number[]; finishes: number[]; started: boolean; finished: boolean };

function usesOf(d: Record<string, unknown>): Map<string, Use> {
  const out = new Map<string, Use>();
  const get = (e: ExamConfig) => {
    let u = out.get(e.id);
    if (!u) out.set(e.id, (u = { first: null, answers: [], starts: [], finishes: [], started: false, finished: false }));
    return u;
  };
  const touch = (u: Use, t: number | null) => {
    if (t != null && (u.first == null || t < u.first)) u.first = t;
  };

  const history = Array.isArray(d.trainingAnswerHistory) ? (d.trainingAnswerHistory as { questionId?: unknown; answeredAt?: unknown }[]) : [];
  for (const a of history) {
    const e = typeof a?.questionId === "string" ? examForQuestion(a.questionId) : undefined;
    if (!e) continue;
    const u = get(e);
    const t = ms(a.answeredAt);
    u.answers.push(t);
    touch(u, t);
  }
  const current = (d.currentTests && typeof d.currentTests === "object" ? d.currentTests : {}) as Record<string, { startedAt?: unknown; answers?: object }>;
  for (const [id, s] of Object.entries(current)) {
    const e = getExamForTestId(Number(id));
    if (!e) continue;
    const u = get(e);
    const t = ms(s?.startedAt);
    u.started = true;
    if (t != null) u.starts.push(t);
    touch(u, t);
    for (let i = 0; i < Object.keys(s?.answers ?? {}).length; i++) u.answers.push(t);
  }
  const completed = Array.isArray(d.completedTests)
    ? (d.completedTests as { id?: unknown; state?: string; startedAt?: unknown; completedAt?: unknown; answers?: { answeredAt?: unknown }[] }[])
    : [];
  for (const s of completed) {
    const e = getExamByStateCode(s?.state) ?? getExamForTestId(Number(s?.id));
    if (!e) continue;
    const u = get(e);
    const st = ms(s.startedAt);
    const ct = ms(s.completedAt) ?? st;
    u.started = true;
    u.finished = true;
    if (st != null) u.starts.push(st);
    if (ct != null) u.finishes.push(ct);
    touch(u, st);
    for (const a of Array.isArray(s.answers) ? s.answers : []) u.answers.push(ms(a?.answeredAt) ?? ct);
  }
  return out;
}

// Running sums, kept in analytics/layoutUsageRun between chunks. Answer
// counts are a histogram (count -> people) so the doc stays small and the
// median can still be read from it.
type Acc = { people: number; startedTest: number; finishedTest: number; hist: Record<string, number> };
type Cohort = { group: LayoutGroup; before: Acc; after: Acc };
export type LayoutRun = {
  cursor: string | null;
  accounts: number;
  startedAt: string;
  now: number;
  allTime: Record<LayoutGroup, Acc>;
  perExam: Record<string, Acc & { group: LayoutGroup }>;
  cohorts: Record<string, Cohort>;
  leaseId?: string | null;
  leaseUntil?: number;
};

const blankAcc = (): Acc => ({ people: 0, startedTest: 0, finishedTest: 0, hist: {} });
// Exact up to 100 answers, then to the nearest 10, so a few heavy users never bloat the doc.
const bucket = (n: number) => String(n <= 100 ? n : Math.round(n / 10) * 10);
function add(a: Acc, started: boolean, finished: boolean, answers: number) {
  a.people++;
  if (started) a.startedTest++;
  if (finished) a.finishedTest++;
  const k = bucket(answers);
  a.hist[k] = (a.hist[k] ?? 0) + 1;
}
function finish(a: Acc): LayoutAgg {
  let median = 0;
  if (a.people) {
    const half = Math.floor(a.people / 2);
    let seen = 0;
    for (const k of Object.keys(a.hist).map(Number).sort((x, y) => x - y)) {
      seen += a.hist[String(k)];
      if (seen > half) {
        median = k;
        break;
      }
    }
  }
  return { people: a.people, startedTest: a.startedTest, finishedTest: a.finishedTest, medianAnswers: median };
}

export function newLayoutRun(): LayoutRun {
  return {
    cursor: null,
    accounts: 0,
    startedAt: new Date().toISOString(),
    now: Date.now(),
    allTime: { interleaved: blankAcc(), setsFirst: blankAcc() },
    perExam: {},
    cohorts: {},
  };
}

const windows = (now: number) => ({
  beforeEnd: SWITCH - FOLLOW_DAYS * DAY + DAY, // the whole first week on the old layout
  afterStart: SWITCH + DAY,
  afterEnd: now - FOLLOW_DAYS * DAY, // a full week of follow-up
});

/** Adds one account to the run's sums. */
export function addAccount(run: LayoutRun, data: Record<string, unknown>) {
  run.accounts++;
  const { beforeEnd, afterStart, afterEnd } = windows(run.now);
  for (const [examId, u] of usesOf(data)) {
    const e = EXAM_BY_ID.get(examId);
    if (!e || (u.answers.length === 0 && !u.started)) continue;
    const g = groupOf(e);
    const fam = familyOf(e);
    add(run.allTime[g], u.started, u.finished, u.answers.length);
    add((run.perExam[fam] ??= { ...blankAcc(), group: g }), u.started, u.finished, u.answers.length);

    if (u.first == null) continue;
    const win = u.first >= BEFORE_START && u.first < beforeEnd ? "before" : u.first >= afterStart && u.first < afterEnd ? "after" : null;
    if (!win) continue;
    const end = u.first + FOLLOW_DAYS * DAY;
    const c = (run.cohorts[fam] ??= { group: g, before: blankAcc(), after: blankAcc() });
    add(
      c[win],
      u.starts.some((t) => t < end),
      u.finishes.some((t) => t < end),
      u.answers.filter((t) => t == null || t < end).length,
    );
  }
}

/** Turns a finished run into the card's payload. */
export function layoutPayload(run: LayoutRun): LayoutUsagePayload {
  const { beforeEnd, afterStart, afterEnd } = windows(run.now);
  const merged: Record<LayoutGroup, { before: Acc; after: Acc; exams: number }> = {
    interleaved: { before: blankAcc(), after: blankAcc(), exams: 0 },
    setsFirst: { before: blankAcc(), after: blankAcc(), exams: 0 },
  };
  for (const c of Object.values(run.cohorts)) {
    if (!c.before.people || !c.after.people) continue; // launched after the switch, or idle before it
    const t = merged[c.group];
    t.exams++;
    for (const w of ["before", "after"] as const) {
      t[w].people += c[w].people;
      t[w].startedTest += c[w].startedTest;
      t[w].finishedTest += c[w].finishedTest;
      for (const [k, n] of Object.entries(c[w].hist)) t[w].hist[k] = (t[w].hist[k] ?? 0) + n;
    }
  }
  const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
  return {
    accounts: run.accounts,
    switchDate: LAYOUT_SWITCH,
    followDays: FOLLOW_DAYS,
    before: { from: iso(BEFORE_START), to: iso(beforeEnd - DAY) },
    after: { from: iso(afterStart), to: iso(afterEnd - DAY), ready: afterEnd > afterStart },
    allTime: { interleaved: finish(run.allTime.interleaved), setsFirst: finish(run.allTime.setsFirst) },
    cohort: {
      interleaved: { before: finish(merged.interleaved.before), after: finish(merged.interleaved.after), exams: merged.interleaved.exams },
      setsFirst: { before: finish(merged.setsFirst.before), after: finish(merged.setsFirst.after), exams: merged.setsFirst.exams },
    },
    exams: Object.entries(run.perExam)
      .map(([id, a]) => ({ id, name: EXAM_BY_ID.get(id)?.name ?? id, group: a.group, ...finish(a) }))
      .filter((e) => e.people >= 10)
      .sort((a, b) => b.people - a.people),
    updatedAt: new Date(run.now).toISOString(),
  };
}

const PAGE_SIZE = 100;
const CHUNK_BUDGET_MS = 35_000;
const LEASE_MS = 75_000;
const RUN_DOC = "analytics/layoutUsageRun";
export const LAYOUT_RESULT_DOC = "globalStats/layoutUsage";

/**
 * One time-boxed chunk of the scan (every account is too many for one
 * serverless call). Resumes from analytics/layoutUsageRun; a lease keeps two
 * admin tabs from scanning at once. On the last chunk the payload is saved to
 * globalStats/layoutUsage and the run doc removed.
 */
export async function runLayoutChunk(fresh: boolean): Promise<{ done: boolean; busy: boolean; accounts: number }> {
  const started = Date.now();
  const db = getAdminDb();
  const runRef = db.doc(RUN_DOC);
  const leaseId = randomUUID();
  const run = await db.runTransaction(async (tx): Promise<LayoutRun | null> => {
    const snap = await tx.get(runRef);
    const existing = snap.exists ? (snap.data() as LayoutRun) : null;
    if (existing?.leaseUntil && existing.leaseUntil > Date.now()) return null;
    const state = existing && !fresh ? existing : newLayoutRun();
    tx.set(runRef, { ...state, leaseId, leaseUntil: Date.now() + LEASE_MS });
    return state;
  });
  if (!run) return { done: false, busy: true, accounts: 0 };

  const skip = await getInternalUids();
  let finished = false;
  while (Date.now() - started < CHUNK_BUDGET_MS) {
    let q = db.collection("users").orderBy(FieldPath.documentId()).select("trainingAnswerHistory", "completedTests", "currentTests").limit(PAGE_SIZE);
    if (run.cursor) q = q.startAfter(run.cursor);
    const page = await q.get();
    for (const doc of page.docs) if (!skip.has(doc.id)) addAccount(run, doc.data());
    if (page.size > 0) run.cursor = page.docs[page.docs.length - 1].id;
    if (page.size < PAGE_SIZE) {
      finished = true;
      break;
    }
  }

  if (!finished) {
    const saved = await db.runTransaction(async (tx) => {
      const snap = await tx.get(runRef);
      if (snap.data()?.leaseId !== leaseId) return false;
      tx.set(runRef, { ...run, leaseId: null, leaseUntil: 0 });
      return true;
    });
    return { done: false, busy: !saved, accounts: run.accounts };
  }
  await db.doc(LAYOUT_RESULT_DOC).set(layoutPayload(run));
  await runRef.delete();
  return { done: true, busy: false, accounts: run.accounts };
}

/** The last finished result, and how far an unfinished scan has got. */
export async function readLayoutUsage(): Promise<{ result: LayoutUsagePayload | null; scanning: { accounts: number; startedAt: string } | null }> {
  const db = getAdminDb();
  const [res, run] = await Promise.all([db.doc(LAYOUT_RESULT_DOC).get(), db.doc(RUN_DOC).get()]);
  const r = run.data() as LayoutRun | undefined;
  return {
    result: (res.data() as LayoutUsagePayload | undefined) ?? null,
    scanning: r ? { accounts: r.accounts, startedAt: r.startedAt } : null,
  };
}
