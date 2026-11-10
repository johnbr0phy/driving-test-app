/**
 * Cron: Aggregate Community Stats
 * Schedule: daily at 03:00 UTC (vercel.json)
 *
 * Reads all real users' answers (in parallel parts, see below) and writes these docs:
 * - globalStats/wrongQuestions — top 50 most-missed universal questions (stats page)
 * - globalStats/questionDifficulty — per-question attempt count + error rate for
 *   every question (universal and state-specific) with enough attempts (FastPass)
 * - globalStats/examWrongQuestions — the same most-missed list for every
 *   registry exam (CDL, CNA, real estate...) and every v2 exam (SAT, ACT,
 *   NCLEX..., from users/{uid}.v2 via lib/v2/questionStats.ts, held-out tests
 *   left out so they stay unseen), only for exams with enough answers
 *   (lib/communityStats.ts), plus the list of tests that qualify
 * - globalStats/exitQuestions — per exam, the last question quiet accounts
 *   answered before leaving, against what its traffic predicts (lib/exitQuestions.ts,
 *   the Exit questions card on the /admin Growth tab)
 * - globalStats/studyTimes — answers in the last 90 days by Eastern weekday and
 *   hour (7 x 24 grid), for picking email send times (the /admin Growth tab)
 *
 * Each consumer reads one doc — fast, cheap, always fresh.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { SITE_URL } from "@/lib/siteUrl";
import {
  COMMUNITY_DMV_KEY,
  COMMUNITY_MIN_ANSWERS,
  COMMUNITY_MIN_QUESTIONS,
  COMMUNITY_TOP_N,
  type ExamCommunityQuestion,
  type ExamCommunityStats,
} from "@/lib/communityStats";
import {
  UID_RANGES,
  buildExitDoc,
  listRealUids,
  mergePartials,
  questionLookups,
  scanUidRanges,
  type StatsPartial,
  type UidRange,
} from "@/lib/server/aggregateStats";

// One function reading every account took 250 to 280 seconds by Nov 2026
// (5,300 accounts) and timed out at 300 on some nights (Nov 5 and Nov 9), so
// the docs kept the day before's numbers. The cron (GET) now lists accounts
// once, sends each slice of the uid space to its own call of this route
// (POST, lib/server/aggregateStats.ts), adds the slices up and writes the docs.
// Each slice is about an eighth of the reading, so the run takes well under a
// minute and has room to grow.
export const maxDuration = 300;

/** Slices of the uid space, each scanned by its own POST call. */
const PARTS = 8;
const PART_TIMEOUT_MS = 280_000;
/** Past this, a failed part leaves too little time to scan in one call. */
const FALLBACK_WITHIN_MS = 30_000;

function verifyCronSecret(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret means no auth locally only: in production an unset CRON_SECRET
  // must not open the route to everyone.
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

const secs = (since: number) => ((Date.now() - since) / 1000).toFixed(1);

/** Splits the uid ranges into `n` slices of neighbouring ranges. */
function slices(ranges: UidRange[], n: number): UidRange[][] {
  const per = Math.ceil(ranges.length / n);
  const out: UidRange[][] = [];
  for (let i = 0; i < ranges.length; i += per) out.push(ranges.slice(i, i + per));
  return out;
}

/**
 * Scans every slice in its own call of this route, at the production origin
 * (deployment URLs sit behind Vercel's protection). Throws if any slice fails,
 * so the docs are never written from part of the accounts.
 */
async function scanInParts(uids: string[], now: number, secret: string): Promise<StatsPartial[]> {
  return Promise.all(
    slices(UID_RANGES, PARTS).map(async (ranges) => {
      const res = await fetch(`${SITE_URL}/api/cron/aggregate-stats`, {
        method: "POST",
        headers: { authorization: `Bearer ${secret}`, "content-type": "application/json" },
        body: JSON.stringify({ ranges, uids, now }),
        cache: "no-store",
        signal: AbortSignal.timeout(PART_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`part ${ranges[0][0] || "start"}: HTTP ${res.status}`);
      return (await res.json()) as StatsPartial;
    }),
  );
}

/** One slice of the scan, called by the cron below. Needs CRON_SECRET. */
export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = Date.now();
  try {
    const { ranges, uids, now } = (await req.json()) as { ranges: UidRange[]; uids: string[]; now: number };
    if (!Array.isArray(ranges) || !Array.isArray(uids) || typeof now !== "number") {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const part = await scanUidRanges(ranges, new Set(uids), now);
    console.log(`[aggregate-stats] part ${ranges[0]?.[0] || "start"}: ${part.sampledUsers} docs in ${secs(started)}s`);
    return NextResponse.json(part);
  } catch (err: any) {
    console.error("[aggregate-stats] part error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const started = Date.now();
    const now = Date.now();
    const db = getAdminDb();
    const uids = await listRealUids();
    const realUids = new Set(uids);
    console.log(`[aggregate-stats] ${uids.length} accounts listed in ${secs(started)}s`);

    // In parts when there is a secret to call them with; otherwise (local
    // dev) in this one call, as before. If the parts fail fast (cannot be
    // reached), fall back to one call too, which still finishes on most nights.
    const secret = process.env.CRON_SECRET;
    let partials: StatsPartial[];
    if (secret) {
      try {
        partials = await scanInParts(uids, now, secret);
      } catch (err) {
        if (Date.now() - started > FALLBACK_WITHIN_MS) throw err;
        console.error("[aggregate-stats] parts failed, scanning in this call:", err);
        partials = [await scanUidRanges(UID_RANGES, realUids, now)];
      }
    } else {
      partials = [await scanUidRanges(UID_RANGES, realUids, now)];
    }
    const merged = mergePartials(partials, now);
    console.log(
      `[aggregate-stats] ${merged.sampledUsers} docs scanned in ${partials.length} part(s), ${secs(started)}s so far`
    );
    const { counts, examCounts } = merged;
    const { qMap } = questionLookups();

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
        users: merged.examUsers[examId] ?? 0,
      };
    }
    const available = [
      ...(ranked.length >= COMMUNITY_MIN_QUESTIONS ? [COMMUNITY_DMV_KEY] : []),
      ...Object.keys(examStats).sort(),
    ];

    // Write to Firestore — one doc per consumer
    await db.collection("globalStats").doc("studyTimes").set({
      // grid[weekday][hour], weekday 0 = Sunday, Eastern time
      grid: Object.fromEntries(merged.studyGrid.map((row, i) => [String(i), row])),
      answers: merged.studyAnswers,
      users: merged.studyUsers,
      sampledUsers: merged.sampledUsers,
      days: 90,
      timeZone: "America/New_York",
      updatedAt: new Date().toISOString(),
    });

    await db.collection("globalStats").doc("exitQuestions").set(buildExitDoc(merged.exits, now));

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
      `[aggregate-stats] computed ${ranked.length} wrong questions, ${Object.keys(difficulty).length} difficulty entries from ${realUids.size} users in ${secs(started)}s`
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
