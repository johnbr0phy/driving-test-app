import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { cleanName, isMemberId } from "@/lib/classes";
import { QUIZ_MAX_MEMBERS, isQuizCode, normalizeQuizCode, type QuizDoc } from "@/lib/quizzes";
import { isClassMember } from "@/lib/server/quizAccess";

// A player gives a name on the quiz page and becomes a member (same shape as
// a class member, lib/classes.ts), so the creator's report lists them.
// Joining again from the same browser renames them. A class quiz takes only
// students of its class: the body carries the browser's `classMemberId` for
// that class (lib/server/quizAccess.ts).
export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  const body = await request.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!isQuizCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (!name) return NextResponse.json({ error: "Enter your name" }, { status: 400 });

  const db = getAdminDb();
  const quizRef = db.collection("quizzes").doc(code);
  const quizDoc = (await quizRef.get()).data() as QuizDoc | undefined;
  if (quizDoc?.visibility === "class" && !(await isClassMember(quizDoc.classCode ?? "", body.classMemberId, db))) {
    return NextResponse.json({ error: "Join the class first", classOnly: true }, { status: 403 });
  }
  const memberRef = quizRef.collection("members").doc(body.memberId);
  const result = await db.runTransaction(async (tx) => {
    const [quiz, member] = await Promise.all([tx.get(quizRef), tx.get(memberRef)]);
    if (!quiz.exists || quiz.data()?.visibility === "private") return { status: 404, error: "No such quiz" };
    if (member.exists) {
      tx.update(memberRef, { name });
      return { status: 200 };
    }
    if ((quiz.data()?.memberCount ?? 0) >= QUIZ_MAX_MEMBERS) return { status: 400, error: "This quiz has all the players it can take" };
    const now = new Date().toISOString();
    tx.create(memberRef, { name, joinedAt: now, lastActive: now, answered: 0, correct: 0, byCategory: {}, missed: {}, tests: {} });
    tx.update(quizRef, { memberCount: FieldValue.increment(1) });
    return { status: 200 };
  });
  if (result.status !== 200) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
