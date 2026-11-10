import { FieldPath } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase-admin";
import { getQuestionsData } from "@/lib/testGenerator";
import { ALL_EXAMS, getExamByStateCode } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { heldOutTests } from "@/lib/v2/training";
import { v2QuestionPerformance } from "@/lib/v2/questionStats";
import { COMMUNITY_DMV_KEY } from "@/lib/communityStats";
import { createExitTally, type ExitTallyState } from "@/lib/exitQuestions";
import { states as STATES } from "@/data/states";

// The account scan behind /api/cron/aggregate-stats. Reading every user doc in
// one function took 250 to 280 seconds by Nov 2026 (5,300 accounts) and passed
// the 300-second limit on some nights, so the cron splits the uid space into
// parts, scans each part in its own function call and adds the parts up here.
// Every sum is per account and each account sits in exactly one part, so the
// parts add up to the same numbers as one scan.

type Tally = { correct: number; wrong: number };

/** One part's running sums, as plain JSON. */
export interface StatsPartial {
  sampledUsers: number;
  /** Training answers by question id (DMV and every registry exam). */
  counts: Record<string, Tally>;
  /** studyGrid[weekday][hour], Eastern time, last 90 days. */
  studyGrid: number[][];
  studyAnswers: number;
  /** Accounts with an answer in the last 90 days. */
  studyUsers: number;
  /** Registry and v2 exam answers, by exam then question id. */
  examCounts: Record<string, Record<string, Tally>>;
  /** Accounts with an answer on each exam. */
  examUsers: Record<string, number>;
  exits: ExitTallyState;
}

const STUDY_DAYS = 90;

// Firebase uids are alphanumeric, so the id space splits at these boundaries
// into ranges that can be paged at the same time.
const BOUNDS = ["", "4", "8", "C", "G", "K", "O", "S", "W", "a", "e", "i", "m", "q", "u", "y", null] as const;
export type UidRange = [from: string, to: string | null];
export const UID_RANGES: UidRange[] = BOUNDS.slice(0, -1).map((from, i) => [from as string, BOUNDS[i + 1]]);

const PAGE_SIZE = 500;

const TEST_EMAILS = ["@johnbrophy.net", "@stensul.com"];
function isTest(email: string | undefined): boolean {
  if (!email) return false;
  const e = email.toLowerCase();
  return TEST_EMAILS.some((t) => e.includes(t)) || /\+\d+@/.test(e) || /test.*@|@.*test/.test(e);
}

/** Every Auth account that is not a test account (one Auth listing). */
export async function listRealUids(): Promise<string[]> {
  const auth = getAdminAuth();
  const uids: string[] = [];
  let pageToken: string | undefined;
  do {
    const result = await auth.listUsers(1000, pageToken);
    for (const u of result.users) if (!isTest(u.email)) uids.push(u.uid);
    pageToken = result.pageToken;
  } while (pageToken);
  return uids;
}

// Static lookups, built once per function instance.
let lookups: ReturnType<typeof buildLookups> | null = null;
function buildLookups() {
  const qMap: Record<string, any> = {};
  for (const q of getQuestionsData("en")) if (q.questionId) qMap[q.questionId] = q;
  const dmvIds = new Set(Object.keys(qMap)); // DMV ids are never an exam's
  // Longest prefix first, so CDLE- never lands in CDL-.
  const prefixes = ALL_EXAMS.map((e) => ({ id: e.id, prefix: e.questionIdPrefix }))
    .filter((e) => !!e.prefix)
    .sort((a, b) => b.prefix.length - a.prefix.length);
  const examOf = (questionId: string) => prefixes.find((e) => questionId.startsWith(e.prefix))?.id;
  // v2 exams (ids never collide with registry ids), never a held-out test's
  // answers, so Common Mistakes cannot leak it.
  const v2Exams = EXAMS_V2.map((e) => ({ id: e.id, skipTests: heldOutTests(e) }));
  const dmvPassPct = new Map(STATES.map((st) => [st.code, st.passingScore]));
  return { qMap, dmvIds, examOf, v2Exams, dmvPassPct };
}
/** DMV questions by id, from the static bank. */
export function questionLookups() {
  return (lookups ??= buildLookups());
}

function newExitTally(now: number) {
  const { dmvIds, examOf, dmvPassPct } = questionLookups();
  return createExitTally({
    now,
    examOf: (id) => (dmvIds.has(id) ? COMMUNITY_DMV_KEY : examOf(id)),
    passPctOf: (state, examId) =>
      examId === COMMUNITY_DMV_KEY ? dmvPassPct.get(state ?? "") ?? 80 : getExamByStateCode(state)?.passPct ?? 80,
  });
}

const blankGrid = () => Array.from({ length: 7 }, () => new Array(24).fill(0));

/**
 * Pages every user doc in the given uid ranges (at the same time) and sums
 * them. Only accounts in `realUids` count. `now` fixes the 90-day study
 * window and the exit tally's quiet cut-off, so every part uses the same.
 */
export async function scanUidRanges(ranges: UidRange[], realUids: Set<string>, now: number): Promise<StatsPartial> {
  const db = getAdminDb();
  const { dmvIds, examOf, v2Exams } = questionLookups();
  const out: StatsPartial = {
    sampledUsers: 0,
    counts: {},
    studyGrid: blankGrid(),
    studyAnswers: 0,
    studyUsers: 0,
    examCounts: {},
    examUsers: {},
    exits: {},
  };
  const studyUsers = new Set<string>();
  const examUsers: Record<string, Set<string>> = {};
  const exits = newExitTally(now);
  const studyFrom = now - STUDY_DAYS * 24 * 60 * 60 * 1000;

  // When people study: every timestamped answer (training and practice tests)
  // from the last 90 days, by Eastern weekday and hour.
  const tally = (uid: string, iso: unknown) => {
    if (typeof iso !== "string") return;
    const t = Date.parse(iso);
    if (Number.isNaN(t) || t < studyFrom) return;
    const slot = easternSlot(t);
    if (!slot) return;
    out.studyGrid[slot.weekday][slot.hour]++;
    out.studyAnswers++;
    studyUsers.add(uid);
  };

  // Registry exam answers, matched to an exam by question id prefix.
  const countExamAnswer = (uid: string, questionId: unknown, isCorrect: unknown) => {
    if (typeof questionId !== "string" || dmvIds.has(questionId)) return;
    const examId = examOf(questionId);
    if (!examId) return;
    const c = ((out.examCounts[examId] ??= {})[questionId] ??= { correct: 0, wrong: 0 });
    if (isCorrect) c.correct++;
    else c.wrong++;
    (examUsers[examId] ??= new Set()).add(uid);
  };

  const countV2 = (uid: string, v2: any) => {
    if (!v2 || typeof v2 !== "object") return;
    for (const exam of v2Exams) {
      const perf = v2QuestionPerformance(v2, exam.id, { skipTests: exam.skipTests });
      if (perf.size === 0) continue;
      const byQuestion = (out.examCounts[exam.id] ??= {});
      for (const [questionId, p] of perf) {
        const c = (byQuestion[questionId] ??= { correct: 0, wrong: 0 });
        c.correct += p.correct;
        c.wrong += p.wrong;
      }
      (examUsers[exam.id] ??= new Set()).add(uid);
    }
  };

  const addUser = (doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    if (!realUids.has(doc.id)) return;
    const data = doc.data();
    exits.add(data);
    const history: any[] = Array.isArray(data.trainingAnswerHistory) ? data.trainingAnswerHistory : [];
    for (const entry of history) {
      tally(doc.id, entry?.answeredAt);
      const id: string = entry?.questionId;
      if (!id) continue;
      countExamAnswer(doc.id, id, entry.isCorrect);
      const c = (out.counts[id] ??= { correct: 0, wrong: 0 });
      if (entry.isCorrect) c.correct++;
      else c.wrong++;
    }
    for (const test of Array.isArray(data.completedTests) ? data.completedTests : []) {
      for (const a of Array.isArray(test?.answers) ? test.answers : []) {
        tally(doc.id, a?.answeredAt);
        if (a?.userAnswer) countExamAnswer(doc.id, a.questionId, a.isCorrect);
      }
    }
    countV2(doc.id, data.v2);
  };

  // Paged by document id, only the answer fields read.
  const readRange = async ([from, to]: UidRange) => {
    let cursor: string | null = null;
    for (;;) {
      let query = db
        .collection("users")
        .select("trainingAnswerHistory", "completedTests", "v2.results", "v2.drills", "v2.questionStats")
        .orderBy(FieldPath.documentId())
        .limit(PAGE_SIZE);
      if (cursor) query = query.startAfter(cursor);
      else if (from) query = query.startAt(from);
      if (to) query = query.endBefore(to);
      const page = await query.get();
      out.sampledUsers += page.size;
      page.forEach(addUser);
      if (page.size < PAGE_SIZE) return;
      cursor = page.docs[page.docs.length - 1].id;
    }
  };
  await Promise.all(ranges.map(readRange));

  out.studyUsers = studyUsers.size;
  for (const [examId, s] of Object.entries(examUsers)) out.examUsers[examId] = s.size;
  out.exits = exits.state();
  return out;
}

/** Adds parts that each scanned different accounts. */
export function mergePartials(parts: StatsPartial[], now: number): StatsPartial {
  const out: StatsPartial = {
    sampledUsers: 0,
    counts: {},
    studyGrid: blankGrid(),
    studyAnswers: 0,
    studyUsers: 0,
    examCounts: {},
    examUsers: {},
    exits: {},
  };
  const addTally = (into: Record<string, Tally>, from: Record<string, Tally>) => {
    for (const [id, c] of Object.entries(from)) {
      const t = (into[id] ??= { correct: 0, wrong: 0 });
      t.correct += c.correct;
      t.wrong += c.wrong;
    }
  };
  const exits = newExitTally(now);
  for (const p of parts) {
    out.sampledUsers += p.sampledUsers;
    addTally(out.counts, p.counts);
    p.studyGrid.forEach((row, d) => row.forEach((n, h) => (out.studyGrid[d][h] += n)));
    out.studyAnswers += p.studyAnswers;
    out.studyUsers += p.studyUsers;
    for (const [examId, byQuestion] of Object.entries(p.examCounts)) addTally((out.examCounts[examId] ??= {}), byQuestion);
    for (const [examId, n] of Object.entries(p.examUsers)) out.examUsers[examId] = (out.examUsers[examId] ?? 0) + n;
    exits.merge(p.exits);
  }
  out.exits = exits.state();
  return out;
}

/** The merged exit tally's doc (globalStats/exitQuestions). */
export function buildExitDoc(exitState: ExitTallyState, now: number) {
  const exits = newExitTally(now);
  exits.merge(exitState);
  return exits.build();
}

const ET_PARTS = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  hour: "2-digit",
  hour12: false,
});
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Weekday (0 = Sunday) and hour (0-23) in Eastern time. */
function easternSlot(ms: number): { weekday: number; hour: number } | null {
  const parts = ET_PARTS.formatToParts(new Date(ms));
  const weekday = WEEKDAYS.indexOf(parts.find((p) => p.type === "weekday")?.value ?? "");
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "", 10) % 24;
  return weekday < 0 || Number.isNaN(hour) ? null : { weekday, hour };
}
