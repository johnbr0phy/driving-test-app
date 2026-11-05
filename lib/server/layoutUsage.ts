import { FieldPath } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { ALL_EXAMS, getExamByStateCode, getExamForTestId, type ExamConfig } from "@/lib/exams";
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

const groupOf = (e: ExamConfig): LayoutGroup => (e.trainingSets.some((s) => s.test != null) ? "interleaved" : "setsFirst");
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

const blank = (): LayoutAgg => ({ people: 0, startedTest: 0, finishedTest: 0, medianAnswers: 0, answers: [] });
function add(a: LayoutAgg, started: boolean, finished: boolean, answers: number) {
  a.people++;
  if (started) a.startedTest++;
  if (finished) a.finishedTest++;
  a.answers!.push(answers);
}
function finish(a: LayoutAgg): LayoutAgg {
  const s = [...(a.answers ?? [])].sort((x, y) => x - y);
  return { people: a.people, startedTest: a.startedTest, finishedTest: a.finishedTest, medianAnswers: s.length ? s[Math.floor(s.length / 2)] : 0 };
}

export async function buildLayoutUsage(): Promise<LayoutUsagePayload> {
  const now = Date.now();
  const beforeEnd = SWITCH - FOLLOW_DAYS * DAY + DAY; // the whole first week on the old layout
  const afterStart = SWITCH + DAY;
  const afterEnd = now - FOLLOW_DAYS * DAY; // a full week of follow-up
  const skip = await getInternalUids();

  const allTime: Record<LayoutGroup, LayoutAgg> = { interleaved: blank(), setsFirst: blank() };
  const perExam = new Map<string, LayoutAgg & { group: LayoutGroup }>();
  // Per exam family, so the before/after comparison can keep only exams seen in both windows.
  const cohorts = new Map<string, { group: LayoutGroup; before: LayoutAgg; after: LayoutAgg }>();
  let accounts = 0;

  const addUser = (id: string, data: Record<string, unknown>) => {
    if (skip.has(id)) return;
    accounts++;
    for (const [examId, u] of usesOf(data)) {
      const e = EXAM_BY_ID.get(examId);
      if (!e || (u.answers.length === 0 && !u.started)) continue;
      const g = groupOf(e);
      const fam = familyOf(e);
      add(allTime[g], u.started, u.finished, u.answers.length);
      let pe = perExam.get(fam);
      if (!pe) perExam.set(fam, (pe = { ...blank(), group: g }));
      add(pe, u.started, u.finished, u.answers.length);

      if (u.first == null) continue;
      const win =
        u.first >= BEFORE_START && u.first < beforeEnd ? "before" : u.first >= afterStart && u.first < afterEnd ? "after" : null;
      if (!win) continue;
      const end = u.first + FOLLOW_DAYS * DAY;
      let c = cohorts.get(fam);
      if (!c) cohorts.set(fam, (c = { group: g, before: blank(), after: blank() }));
      add(
        c[win],
        u.starts.some((t) => t < end),
        u.finishes.some((t) => t < end),
        u.answers.filter((t) => t == null || t < end).length,
      );
    }
  };

  // Firebase uids are alphanumeric: page these id ranges at the same time
  // (the same split /api/cron/aggregate-stats uses).
  const db = getAdminDb();
  const PAGE = 500;
  const BOUNDS = ["", "4", "8", "C", "G", "K", "O", "S", "W", "a", "e", "i", "m", "q", "u", "y", null];
  const readRange = async (from: string, to: string | null) => {
    let cursor: string | null = null;
    for (;;) {
      let q = db.collection("users").select("trainingAnswerHistory", "completedTests", "currentTests").orderBy(FieldPath.documentId()).limit(PAGE);
      if (cursor) q = q.startAfter(cursor);
      else if (from) q = q.startAt(from);
      if (to) q = q.endBefore(to);
      const page = await q.get();
      page.forEach((doc) => addUser(doc.id, doc.data()));
      if (page.size < PAGE) return;
      cursor = page.docs[page.docs.length - 1].id;
    }
  };
  await Promise.all(BOUNDS.slice(0, -1).map((from, i) => readRange(from as string, BOUNDS[i + 1])));

  const cohort: LayoutUsagePayload["cohort"] = {
    interleaved: { before: blank(), after: blank(), exams: 0 },
    setsFirst: { before: blank(), after: blank(), exams: 0 },
  };
  for (const c of cohorts.values()) {
    if (!c.before.people || !c.after.people) continue; // exams launched after the switch, or idle before it
    const t = cohort[c.group];
    t.exams++;
    for (const w of ["before", "after"] as const) {
      t[w].people += c[w].people;
      t[w].startedTest += c[w].startedTest;
      t[w].finishedTest += c[w].finishedTest;
      t[w].answers!.push(...c[w].answers!);
    }
  }
  for (const g of ["interleaved", "setsFirst"] as const) {
    cohort[g].before = finish(cohort[g].before);
    cohort[g].after = finish(cohort[g].after);
  }

  const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
  return {
    accounts,
    switchDate: LAYOUT_SWITCH,
    followDays: FOLLOW_DAYS,
    before: { from: iso(BEFORE_START), to: iso(beforeEnd - DAY) },
    after: { from: iso(afterStart), to: iso(afterEnd - DAY), ready: afterEnd > afterStart },
    allTime: { interleaved: finish(allTime.interleaved), setsFirst: finish(allTime.setsFirst) },
    cohort,
    exams: [...perExam.entries()]
      .map(([id, a]) => ({ id, name: EXAM_BY_ID.get(id)?.name ?? id, group: a.group, ...finish(a) }))
      .filter((e) => e.people >= 10)
      .sort((a, b) => b.people - a.people),
    updatedAt: new Date(now).toISOString(),
  };
}
