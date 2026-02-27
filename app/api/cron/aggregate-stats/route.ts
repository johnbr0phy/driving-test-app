/**
 * Cron: Aggregate Community Stats
 * Schedule: daily at 03:00 UTC (vercel.json)
 *
 * Reads all real users' trainingAnswerHistory, computes the top 20 most-missed
 * universal questions, and writes the result to Firestore: globalStats/wrongQuestions
 *
 * The stats page reads this one doc — fast, cheap, always fresh.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebase-admin";
import { getQuestionsData } from "@/lib/testGenerator";

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

    // Aggregate answer history across all real users
    const snap = await db.collection("users").limit(2000).get();
    const counts: Record<string, { correct: number; wrong: number }> = {};

    snap.forEach((doc) => {
      if (!realUids.has(doc.id)) return;
      const history: any[] = doc.data().trainingAnswerHistory || [];
      for (const entry of history) {
        const id: string = entry.questionId;
        if (!id || !id.startsWith("U-")) continue; // universal questions only
        if (!counts[id]) counts[id] = { correct: 0, wrong: 0 };
        if (entry.isCorrect) counts[id].correct++;
        else counts[id].wrong++;
      }
    });

    // Build question lookup map from static data
    const allQuestions = getQuestionsData("en");
    const qMap: Record<string, any> = {};
    allQuestions.forEach((q) => {
      if (q.questionId) qMap[q.questionId] = q;
    });

    // Rank by wrong count, require 5+ attempts for statistical significance
    const MIN_ATTEMPTS = 5;
    const TOP_N = 20;

    const ranked = Object.entries(counts)
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

    // Write to Firestore — single doc, stats page reads this
    await db
      .collection("globalStats")
      .doc("wrongQuestions")
      .set({
        questions: ranked,
        totalUsers: realUids.size,
        updatedAt: new Date().toISOString(),
      });

    console.log(
      `[aggregate-stats] computed ${ranked.length} questions from ${realUids.size} users`
    );
    return NextResponse.json({ computed: ranked.length, users: realUids.size });
  } catch (err: any) {
    console.error("[aggregate-stats] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
