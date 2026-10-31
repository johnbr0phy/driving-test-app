/**
 * Cron: Aggregate Community Stats
 * Schedule: daily at 03:00 UTC (vercel.json)
 *
 * Reads all real users' trainingAnswerHistory and writes two docs to Firestore:
 * - globalStats/wrongQuestions — top 50 most-missed universal questions (stats page)
 * - globalStats/questionDifficulty — per-question attempt count + error rate for
 *   every question (universal and state-specific) with enough attempts (FastPass)
 * - globalStats/examWrongQuestions — the same most-missed list for every
 *   registry exam (CDL, CNA, real estate...) and every v2 exam (SAT, ACT,
 *   NCLEX..., from users/{uid}.v2 via lib/v2/questionStats.ts, held-out tests
 *   left out so they stay unseen), only for exams with enough answers
 *   (lib/communityStats.ts), plus the list of tests that qualify
 * - globalStats/studyTimes — answers in the last 90 days by Eastern weekday and
 *   hour (7 x 24 grid), for picking email send times (the /admin Growth tab)
 *
 * Each consumer reads one doc — fast, cheap, always fresh.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { FieldPath } from "firebase-admin/firestore";
import { getQuestionsData } from "@/lib/testGenerator";
import { ALL_EXAMS } from "@/lib/exams";
import { EXAMS_V2 } from "@/lib/v2/registry";
import { heldOutTests } from "@/lib/v2/training";
import { v2QuestionPerformance } from "@/lib/v2/questionStats";
import {
  COMMUNITY_DMV_KEY,
  COMMUNITY_MIN_ANSWERS,
  COMMUNITY_MIN_QUESTIONS,
  COMMUNITY_TOP_N,
  type ExamCommunityQuestion,
  type ExamCommunityStats,
} from "@/lib/communityStats";

// Paging every account one after another passed 60s at ~5,000 accounts
// (timed out nightly from Oct 19 2026, so the docs kept the old 2,000-account
// numbers). Reads now run in parallel uid ranges, with room to grow.
export const maxDuration = 300;

function verifyCronSecret(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

const TEST_EMAILS = ["@johnbrophy.net", "@stensul.com"];
function isTest(email: string | undefined): boolean {
  if (!email) return false;
  const e = email.toLowerCase();
  return (
    TEST_EMAILS.some((t) => e.includes(t)) ||
    /\+\d+@/.test(e) ||
    /test.*@|@.*test/.test(e)
  );
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auth = getAdminAuth();
    const db = getAdminDb();

    // Build real UID set (one Auth batch call)
    const realUids = new Set<string>();
    let pageToken: string | undefined;
    do {
      const result = await auth.listUsers(1000, pageToken);
      for (const u of result.users) {
        if (!isTest(u.email)) realUids.add(u.uid);
      }
      pageToken = result.pageToken;
    } while (pageToken);

    // Aggregate answer history across all real users. Paged by document id,
    // only the two answer fields read: a single limit(2000) read used to stop
    // at the first 2,000 accounts (4,892 by Oct 2026) and skip everyone after.
    const counts: Record<string, { correct: number; wrong: number }> = {};

    // When people study: every timestamped answer (training and practice
    // tests) from the last 90 days, bucketed by Eastern weekday and hour.
    const studyGrid: number[][] = Array.from({ length: 7 }, () => new Array(24).fill(0));
    const studyFrom = Date.now() - 90 * 24 * 60 * 60 * 1000;
    let studyAnswers = 0;
    let sampledUsers = 0;
    const studyUsers = new Set<string>();
    const tally = (uid: string, iso: unknown) => {
      if (typeof iso !== "string") return;
      const t = Date.parse(iso);
      if (Number.isNaN(t) || t < studyFrom) return;
      const slot = easternSlot(t);
      if (!slot) return;
      studyGrid[slot.weekday][slot.hour]++;
      studyAnswers++;
      studyUsers.add(uid);
    };

    // Build question lookup map from static data (DMV ids are never an exam's)
    const allQuestions = getQuestionsData("en");
    const qMap: Record<string, any> = {};
    allQuestions.forEach((q) => {
      if (q.questionId) qMap[q.questionId] = q;
    });

    const dmvIds = new Set(Object.keys(qMap));

    // Firebase uids are alphanumeric, so split the id space into ranges at
    // these boundaries and page each range at the same time.
    const PAGE_SIZE = 500;
    const BOUNDS = ["", "4", "8", "C", "G", "K", "O", "S", "W", "a", "e", "i", "m", "q", "u", "y", null];
    const readRange = async (from: string, to: string | null) => {
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
        sampledUsers += page.size;
        page.forEach(addUser);
        if (page.size < PAGE_SIZE) return;
        cursor = page.docs[page.docs.length - 1].id;
      }
    };
    // Registry exam answers, by exam: training answers and answered
    // questions in finished practice tests, matched to an exam by question id
    // prefix (longest first, so CDLE- never lands in CDL-).
    const examCounts: Record<string, Record<string, { correct: number; wrong: number }>> = {};
    const examUsers: Record<string, Set<string>> = {};
    const prefixes = ALL_EXAMS.map((e) => ({ id: e.id, prefix: e.questionIdPrefix }))
      .filter((e) => !!e.prefix)
      .sort((a, b) => b.prefix.length - a.prefix.length);
    const examOf = (questionId: string) => prefixes.find((e) => questionId.startsWith(e.prefix))?.id;
    const countExamAnswer = (uid: string, questionId: unknown, isCorrect: unknown) => {
      if (typeof questionId !== "string" || dmvIds.has(questionId)) return;
      const examId = examOf(questionId);
      if (!examId) return;
      const byQuestion = (examCounts[examId] ??= {});
      const c = (byQuestion[questionId] ??= { correct: 0, wrong: 0 });
      if (isCorrect) c.correct++;
      else c.wrong++;
      (examUsers[examId] ??= new Set()).add(uid);
    };

    // v2 exams (ids never collide with registry ids): test and drill answers,
    // never a held-out test's, so Common Mistakes cannot leak it.
    const v2Exams = EXAMS_V2.map((e) => ({ id: e.id, skipTests: heldOutTests(e) }));
    const countV2 = (uid: string, v2: any) => {
      if (!v2 || typeof v2 !== "object") return;
      for (const exam of v2Exams) {
        const perf = v2QuestionPerformance(v2, exam.id, { skipTests: exam.skipTests });
        if (perf.size === 0) continue;
        const byQuestion = (examCounts[exam.id] ??= {});
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
      const history: any[] = Array.isArray(data.trainingAnswerHistory) ? data.trainingAnswerHistory : [];
      for (const entry of history) {
        tally(doc.id, entry?.answeredAt);
        const id: string = entry?.questionId;
        if (!id) continue;
        countExamAnswer(doc.id, id, entry.isCorrect);
        if (!counts[id]) counts[id] = { correct: 0, wrong: 0 };
        if (entry.isCorrect) counts[id].correct++;
        else counts[id].wrong++;
      }
      for (const test of Array.isArray(data.completedTests) ? data.completedTests : []) {
        for (const a of Array.isArray(test?.answers) ? test.answers : []) {
          tally(doc.id, a?.answeredAt);
          if (a?.userAnswer) countExamAnswer(doc.id, a.questionId, a.isCorrect);
        }
      }
      countV2(doc.id, data.v2);
    };
    await Promise.all(BOUNDS.slice(0, -1).map((from, i) => readRange(from as string, BOUNDS[i + 1])));

    // Rank by wrong count, with enough answers per question to be meaningful
    const MIN_ATTEMPTS = COMMUNITY_MIN_ANSWERS;
    const TOP_N = COMMUNITY_TOP_N;

    const ranked = Object.entries(counts)
      .filter(([id]) => id.startsWith("U-")) // wrongQuestions doc is universal-only
      .map(([id, c]) => ({
        questionId: id,
        wrong: c.wrong,
        correct: c.correct,
        total: c.wrong + c.correct,
        errorRate: c.wrong / (c.wrong + c.correct),
      }))
      .filter((q) => q.total >= MIN_ATTEMPTS)
      .sort((a, b) => b.wrong - a.wrong)
      .slice(0, TOP_N)
      .map((q) => {
        const question = qMap[q.questionId];
        const options = question
          ? [question.optionA, question.optionB, question.optionC, question.optionD]
          : [];
        const correctAnswer = question ? options[question.correctIndex] : "";
        return {
          questionId: q.questionId,
          question: question?.question || "",
          options: question ? [question.optionA, question.optionB, question.optionC, question.optionD] : [],
          correctAnswer,
          explanation: question?.explanation || "",
          wrong: q.wrong,
          total: q.total,
          errorRate: Math.round(q.errorRate * 100), // store as integer percent
        };
      });

    // Full difficulty table for FastPass: every question (universal + state-specific)
    // with enough attempts to be meaningful. State-specific questions get far less
    // traffic per state, so they clear a lower bar.
    const MIN_ATTEMPTS_UNIVERSAL = 10;
    const MIN_ATTEMPTS_STATE = 5;

    const difficulty: Record<string, { total: number; errorRate: number }> = {};
    for (const [id, c] of Object.entries(counts)) {
      if (!qMap[id]) continue; // skip retired/unknown question ids
      const total = c.correct + c.wrong;
      const minAttempts = id.startsWith("U-")
        ? MIN_ATTEMPTS_UNIVERSAL
        : MIN_ATTEMPTS_STATE;
      if (total < minAttempts) continue;
      difficulty[id] = {
        total,
        errorRate: Math.round((c.wrong / total) * 100), // integer percent
      };
    }

    // Most-missed per registry exam, kept only for exams with enough data.
    const examStats: Record<string, ExamCommunityStats> = {};
    for (const [examId, byQuestion] of Object.entries(examCounts)) {
      const qualifying: ExamCommunityQuestion[] = Object.entries(byQuestion)
        .map(([questionId, c]) => ({ questionId, wrong: c.wrong, total: c.wrong + c.correct, errorRate: 0 }))
        .filter((q) => q.total >= COMMUNITY_MIN_ANSWERS);
      if (qualifying.length < COMMUNITY_MIN_QUESTIONS) continue;
      examStats[examId] = {
        questions: qualifying
          .map((q) => ({ ...q, errorRate: Math.round((q.wrong / q.total) * 100) }))
          .sort((a, b) => b.wrong - a.wrong)
          .slice(0, COMMUNITY_TOP_N),
        users: examUsers[examId]?.size ?? 0,
      };
    }
    const available = [
      ...(ranked.length >= COMMUNITY_MIN_QUESTIONS ? [COMMUNITY_DMV_KEY] : []),
      ...Object.keys(examStats).sort(),
    ];

    // Write to Firestore — one doc per consumer
    await db.collection("globalStats").doc("studyTimes").set({
      // grid[weekday][hour], weekday 0 = Sunday, Eastern time
      grid: Object.fromEntries(studyGrid.map((row, i) => [String(i), row])),
      answers: studyAnswers,
      users: studyUsers.size,
      sampledUsers,
      days: 90,
      timeZone: "America/New_York",
      updatedAt: new Date().toISOString(),
    });

    await db
      .collection("globalStats")
      .doc("wrongQuestions")
      .set({
        questions: ranked,
        totalUsers: realUids.size,
        updatedAt: new Date().toISOString(),
      });

    await db.collection("globalStats").doc("examWrongQuestions").set({
      available,
      exams: examStats,
      minAnswers: COMMUNITY_MIN_ANSWERS,
      minQuestions: COMMUNITY_MIN_QUESTIONS,
      updatedAt: new Date().toISOString(),
    });

    await db
      .collection("globalStats")
      .doc("questionDifficulty")
      .set({
        questions: difficulty,
        minAttempts: {
          universal: MIN_ATTEMPTS_UNIVERSAL,
          stateSpecific: MIN_ATTEMPTS_STATE,
        },
        totalUsers: realUids.size,
        updatedAt: new Date().toISOString(),
      });

    console.log(
      `[aggregate-stats] Common Mistakes on: ${available.join(", ") || "none"}`
    );
    console.log(
      `[aggregate-stats] computed ${ranked.length} wrong questions, ${Object.keys(difficulty).length} difficulty entries from ${realUids.size} users`
    );
    return NextResponse.json({
      computed: ranked.length,
      difficultyEntries: Object.keys(difficulty).length,
      communityTests: available,
      users: realUids.size,
    });
  } catch (err: any) {
    console.error("[aggregate-stats] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
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
