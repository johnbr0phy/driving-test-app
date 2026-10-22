import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { isMemberId } from "@/lib/classes";
import { isQuizCode, normalizeQuizCode } from "@/lib/quizzes";
import { applyMemberProgress, memberBatch } from "@/lib/server/classMembers";

// A named player's practice on a quiz, batched by lib/classProgress.ts.
export async function POST(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  const body = await request.json().catch(() => ({}));
  if (!isQuizCode(code) || !isMemberId(body.memberId)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const { answers, tests } = memberBatch(body);
  if (!answers.length && !tests.length) return NextResponse.json({ ok: true });

  const db = getAdminDb();
  const ref = db.collection("quizzes").doc(code).collection("members").doc(body.memberId);
  const found = await applyMemberProgress(db, ref, answers, tests);
  if (!found) return NextResponse.json({ error: "Not a player of this quiz" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
