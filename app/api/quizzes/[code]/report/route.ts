import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { requireCaller } from "@/lib/server/classAuth";
import { buildClassReport, type MemberDoc } from "@/lib/server/classReport";
import { getQuiz, quizAsClassDoc, quizReportSubject } from "@/lib/server/quizzes";
import { isQuizCode, normalizeQuizCode } from "@/lib/quizzes";

// The creator's view of who played their quiz: the class report
// (lib/server/classReport.ts) built from the quiz's members. Owner or site admin.
export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  const caller = await requireCaller(request);
  if (!caller.ok) return caller.response;
  const quiz = await getQuiz(code);
  if (!quiz || (quiz.ownerUid !== caller.uid && !caller.admin)) return NextResponse.json({ error: "Not your quiz" }, { status: 403 });
  const snap = await getAdminDb().collection("quizzes").doc(code).collection("members").get();
  const members = snap.docs.map((d) => d.data() as MemberDoc);
  return NextResponse.json({ ...buildClassReport(code, quizAsClassDoc(quiz), members, Date.now(), quizReportSubject(quiz)), plays: quiz.plays ?? 0 });
}
