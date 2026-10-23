import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { classExamNameById, cleanName, isClassCode, isMemberId, normalizeClassCode, type ClassPublicInfo } from "@/lib/classes";
import { joinClassMember } from "@/lib/server/classMembers";
import { getQuiz } from "@/lib/server/quizzes";
import { isQuizCode, normalizeQuizCode } from "@/lib/quizzes";

// The join card on a class-only quiz (lib/server/quizAccess.ts): a student
// types the class code their teacher gave them and their name. Only the
// quiz's own class is joined, so a code for another class never signs them
// up somewhere by mistake. Returns the class's public info for the browser's
// membership list (lib/classProgress.ts).
export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  const body = await request.json().catch(() => ({}));
  const classCode = normalizeClassCode(String(body.classCode ?? ""));
  const name = cleanName(body.name);
  if (!isQuizCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!isClassCode(classCode)) return NextResponse.json({ error: "Enter the 5-character class code" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Enter your name" }, { status: 400 });

  const db = getAdminDb();
  const quiz = await getQuiz(code, db);
  if (!quiz || quiz.visibility !== "class" || !quiz.classCode) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  if (quiz.classCode !== classCode) {
    return NextResponse.json({ error: "That code isn't for this quiz's class. Check it with your teacher." }, { status: 400 });
  }
  const result = await joinClassMember(db, classCode, body.memberId, name);
  if (result.status !== 200) return NextResponse.json({ error: result.error }, { status: result.status });
  const c = (await db.collection("classes").doc(classCode).get()).data()!;
  const info: ClassPublicInfo = {
    code: classCode,
    name: c.name,
    examId: c.examId,
    examName: classExamNameById(c.examId, c.state),
    ...(c.state ? { state: c.state } : {}),
    teacherName: c.teacherName,
    school: c.school ?? "",
  };
  return NextResponse.json(info);
}
