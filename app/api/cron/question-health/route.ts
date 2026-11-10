/**
 * Cron: question health. Schedule: daily at 03:40 UTC (vercel.json), after
 * aggregate-stats.
 *
 * Reads every questionPicks/{examId} doc (anonymous option picks,
 * lib/questionPicks.ts) and every open questionReports doc, runs
 * flagQuestion() on each question and writes globalStats/questionFlags: the
 * worst MAX_FLAGS questions by score, counts per exam and per kind, and the
 * open report total. The /admin Questions tab and the weekly audit
 * (scripts/question-audit.ts) both read that one doc.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { flagQuestion, type FlagKind, type QuestionFlag, type QuestionPickCounts } from "@/lib/questionQuality";

export const maxDuration = 120;
const MAX_FLAGS = 600;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  // No secret means no auth locally only: in production an unset CRON_SECRET
  // must not open the route to everyone.
  if (!secret) return process.env.NODE_ENV !== "production";
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = getAdminDb();

  const reports = await db.collection("questionReports").where("status", "==", "open").get();
  const openByQuestion = new Map<string, number>();
  for (const d of reports.docs) {
    const r = d.data();
    const key = `${r.examId}|${r.questionId}`;
    openByQuestion.set(key, (openByQuestion.get(key) || 0) + 1);
  }

  const flags: QuestionFlag[] = [];
  const seen = new Set<string>();
  const answeredByExam: Record<string, { questions: number; answers: number }> = {};
  const picks = await db.collection("questionPicks").get();
  for (const doc of picks.docs) {
    const examId = doc.id;
    const stats = (answeredByExam[examId] = { questions: 0, answers: 0 });
    for (const [questionId, value] of Object.entries(doc.data())) {
      if (questionId.startsWith("_") || !value || typeof value !== "object") continue;
      const counts = value as QuestionPickCounts;
      stats.questions++;
      stats.answers += counts.n || 0;
      const key = `${examId}|${questionId}`;
      seen.add(key);
      const flag = flagQuestion(examId, questionId, counts, openByQuestion.get(key) || 0);
      if (flag) flags.push(flag);
    }
  }
  // Reported questions with no pick counts yet still make the list.
  for (const [key, count] of openByQuestion) {
    if (seen.has(key)) continue;
    const [examId, questionId] = key.split("|");
    const flag = flagQuestion(examId, questionId, { n: 0, c: 0 }, count);
    if (flag) flags.push(flag);
  }

  flags.sort((a, b) => b.score - a.score);
  const byKind: Partial<Record<FlagKind, number>> = {};
  const byExam: Record<string, number> = {};
  for (const f of flags) {
    byExam[f.examId] = (byExam[f.examId] || 0) + 1;
    for (const k of f.kinds) byKind[k] = (byKind[k] || 0) + 1;
  }
  const doc = {
    flags: flags.slice(0, MAX_FLAGS),
    totalFlags: flags.length,
    byKind,
    byExam,
    answeredByExam,
    openReports: reports.size,
    updatedAt: new Date().toISOString(),
  };
  await db.doc("globalStats/questionFlags").set(doc);
  console.log(`[question-health] ${flags.length} flagged questions, ${reports.size} open reports, ${picks.size} exams with picks`);
  return NextResponse.json({ flags: flags.length, openReports: reports.size, exams: picks.size, byKind });
}
