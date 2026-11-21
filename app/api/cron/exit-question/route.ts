/**
 * Cron: The question that got away
 * Schedule: daily at 18:00 UTC (vercel.json)
 *
 * Someone who stopped studying right after a question (the "question" exits
 * on the /admin Exit questions card, lib/exitQuestions.ts) and has been quiet
 * for EXIT_EMAIL_MIN_DAYS to EXIT_EMAIL_MAX_DAYS gets that question back, with
 * the answer, the explanation and a joke, once ever.
 *
 * Skipped: anyone who passed a practice test on that exam (they're done), whose
 * last act was finishing a test, who answered fewer than EXIT_MIN_ANSWERS
 * questions, who reads in another language (the copy and bank text are
 * English), or who was emailed in the last 24 hours. DMV and v1 exams only:
 * v2 exams keep no per-answer times.
 *
 * Paused unless EXIT_QUESTION_CAMPAIGN=send: a paused run sends nothing and
 * returns the eligible count plus a few sample question ids. `?dry=1` does
 * the same while live.
 */

import { NextRequest, NextResponse } from "next/server";
import { makeSnapshotRetryPolicy } from "@/lib/server/emailRetryPolicy";
import {
  buildAuthMap,
  DAY_MS,
  emailedRecently,
  getEligibleUsers,
  processBatch,
  verifyCronSecret,
  notSentAndNotRecent,
} from "@/lib/cron-email";
import { exitQuestionEmail, exitQuestionSubject, type ExitQuestionContent } from "@/lib/email-templates";
import { voiceFor } from "@/lib/email-voice";
import { findAccountExit, type AccountExit } from "@/lib/exitQuestions";
import { getQuestionsData } from "@/lib/testGenerator";
import { ALL_EXAMS, getExamByStateCode } from "@/lib/exams";
import { states as STATES } from "@/data/states";
import { COMMUNITY_DMV_KEY } from "@/lib/communityStats";
import { classQuestionLookup } from "@/lib/server/classQuestions";
import { isInternalEmail } from "@/lib/internal";
import { eventTime } from "@/lib/email-lifecycle";

export const maxDuration = 300;

const EMAIL_KEY = "exitQuestion";
const INCLUDE_LEGACY = process.env.INCLUDE_LEGACY_CONSENT === "true";
/** Quiet at least this long: long enough to count as gone, not just a weekend. */
const EXIT_EMAIL_MIN_DAYS = 3;
/** And no longer than this: past it, most have sat the test already. */
const EXIT_EMAIL_MAX_DAYS = 10;

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = Date.now();
    const live = process.env.EXIT_QUESTION_CAMPAIGN === "send" && req.nextUrl.searchParams.get("dry") !== "1";

    const dmvIds = new Set(getQuestionsData("en").map((q) => q.questionId));
    const prefixes = ALL_EXAMS.map((e) => ({ id: e.id, prefix: e.questionIdPrefix }))
      .filter((e) => !!e.prefix)
      .sort((a, b) => b.prefix.length - a.prefix.length);
    // Cached: every answer of every candidate goes through this, and a linear
    // scan of several hundred prefixes per answer was most of the run time.
    const examCache = new Map<string, string | undefined>();
    const examOf = (id: string) => {
      if (examCache.has(id)) return examCache.get(id);
      const exam = dmvIds.has(id) ? COMMUNITY_DMV_KEY : prefixes.find((e) => id.startsWith(e.prefix))?.id;
      examCache.set(id, exam);
      return exam;
    };
    const dmvPassPct = new Map(STATES.map((st) => [st.code, st.passingScore]));
    const passPctOf = (state: string | undefined, examId: string) =>
      examId === COMMUNITY_DMV_KEY ? dmvPassPct.get(state ?? "") ?? 80 : getExamByStateCode(state)?.passPct ?? 80;

    const lookups = new Map<string, ReturnType<typeof classQuestionLookup>>();
    const lookup = (examId: string) => {
      let l = lookups.get(examId);
      if (!l) lookups.set(examId, (l = classQuestionLookup(examId)));
      return l;
    };

    const authMap = await buildAuthMap();
    // Win-back: exempt from the quiet-days rule, bounded by EXIT_EMAIL_MAX_DAYS.
    // Every answer save also writes lastUpdated, so lastUpdated >= the exit
    // answer's time, and lastActiveAt >= lastUpdated. An account can only
    // qualify if lastUpdated falls inside the quiet window. Checking that on
    // the light fields keeps the full-record download to those few accounts
    // (downloading every consented account timed out at 300s every day).
    const inQuietWindow = (u: { lastUpdated: Date | null }) => {
      if (!u.lastUpdated) return true; // let the full record decide
      const quiet = now - u.lastUpdated.getTime();
      return quiet >= EXIT_EMAIL_MIN_DAYS * DAY_MS && quiet <= EXIT_EMAIL_MAX_DAYS * DAY_MS;
    };
    const users = await getEligibleUsers(authMap, INCLUDE_LEGACY, true, (u) =>
      notSentAndNotRecent(EMAIL_KEY)(u) && (u.language === null || u.language === "en") && inQuietWindow(u));

    const exits = new Map<string, { exit: AccountExit; content: ExitQuestionContent }>();
    const eligible = users.filter((u) => {
      if (u.emailsSent.includes(EMAIL_KEY)) return false;
      if (emailedRecently(u, now)) return false;
      if (isInternalEmail(u.email)) return false;
      const lang = u.raw.language;
      if (typeof lang === "string" && lang !== "en") return false;
      // Nothing saved since: a later save means they came back some other way.
      if (now - u.lastActiveAt.getTime() < EXIT_EMAIL_MIN_DAYS * DAY_MS) return false;

      const exit = findAccountExit(u.raw, { examOf, passPctOf });
      if (!exit) return false;
      // V2 has no per-answer timestamps, so it cannot provide this question.
      // A newer V2 save still proves the account moved on. Do not reuse an
      // older v1 question as though it were the latest study activity.
      if ((eventTime(u.raw.v2?.updatedAt) ?? 0) > exit.at) return false;
      const quiet = now - exit.at;
      if (quiet < EXIT_EMAIL_MIN_DAYS * DAY_MS || quiet > EXIT_EMAIL_MAX_DAYS * DAY_MS) return false;

      const q = lookup(exit.examId)(exit.questionId);
      if (!q || !q.question || !q.answer) return false;
      exits.set(u.uid, {
        exit,
        content: { question: q.question, options: q.options, answer: q.answer, explanation: q.explanation, isCorrect: exit.isCorrect },
      });
      return true;
    });

    if (!live) {
      const sample = eligible.slice(0, 10).map((u) => {
        const e = exits.get(u.uid)!.exit;
        return { examId: e.examId, questionId: e.questionId, isCorrect: e.isCorrect, daysQuiet: Math.round((now - e.at) / DAY_MS) };
      });
      console.log(`[exit-question] paused: ${eligible.length} eligible`);
      return NextResponse.json({ paused: true, eligible: eligible.length, sample });
    }

    const result = await processBatch({
      label: "exit-question",
      emailKey: EMAIL_KEY,
      subject: (u) => exitQuestionSubject(exits.get(u.uid)!.content, voiceFor(exits.get(u.uid)!.exit.examId)),
      // The emails are about the exam the question came from, which can differ
      // from the person's current test.
      template: (u) => {
        const { exit, content } = exits.get(u.uid)!;
        return exitQuestionEmail(voiceFor(exit.examId), content);
      },
      users: eligible,
      retryPolicy: (u) => makeSnapshotRetryPolicy(u.raw, { expiresAt: exits.get(u.uid)!.exit.at + EXIT_EMAIL_MAX_DAYS * DAY_MS, campaignGate: "EXIT_QUESTION_CAMPAIGN" }),
      eligible: (fresh, user) => {
        const expected = exits.get(user.uid)?.exit;
        if (!expected || (typeof fresh.language === "string" && fresh.language !== "en")) return false;
        const current = findAccountExit(fresh, { examOf, passPctOf });
        if (!current || current.examId !== expected.examId || current.questionId !== expected.questionId ||
          current.at !== expected.at || current.isCorrect !== expected.isCorrect) return false;
        const latestSave = Math.max(eventTime(fresh.lastUpdated) ?? 0, eventTime(fresh.v2?.updatedAt) ?? 0);
        if (latestSave > user.lastActiveAt.getTime() || (eventTime(fresh.v2?.updatedAt) ?? 0) > current.at) return false;
        const quiet = Date.now() - current.at;
        return quiet >= EXIT_EMAIL_MIN_DAYS * DAY_MS && quiet <= EXIT_EMAIL_MAX_DAYS * DAY_MS;
      },
      record: (u) => {
        const { exit } = exits.get(u.uid)!;
        return { exitQuestionEmail: { examId: exit.examId, questionId: exit.questionId, isCorrect: exit.isCorrect } };
      },
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("[exit-question] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
