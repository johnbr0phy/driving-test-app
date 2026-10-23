import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { isQuizCode, normalizeQuizCode } from "@/lib/quizzes";
import { bumpCounter } from "@/lib/server/quizzes";

// "Report this question": a player says a quiz question looks wrong. Each
// report is a doc in quizReports and a count on the quiz and its question
// (quizzes/{code}.questionReports.{id}), which the creator sees on the edit page.
const REASONS = ["wrong_answer", "unclear", "typo", "other"] as const;

export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  const body = await request.json().catch(() => ({}));
  const questionId = typeof body.questionId === "string" && /^q\d{1,5}$/.test(body.questionId) ? body.questionId : "";
  const reason = (REASONS as readonly string[]).includes(body.reason) ? body.reason : "other";
  const note = typeof body.note === "string" ? body.note.replace(/[<>]/g, "").trim().slice(0, 300) : "";
  if (!isQuizCode(code) || !questionId) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const db = getAdminDb();
  const quizRef = db.collection("quizzes").doc(code);
  const quiz = await quizRef.get();
  if (!quiz.exists) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  await db.collection("quizReports").add({ code, questionId, reason, note, createdAt: new Date().toISOString() });
  await quizRef.update({ reports: FieldValue.increment(1), [`questionReports.${questionId}`]: FieldValue.increment(1) });
  await bumpCounter(db, "questionReports");
  return NextResponse.json({ ok: true });
}
