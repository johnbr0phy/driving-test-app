import { NextRequest, NextResponse } from "next/server";
import { recordQuizPlay } from "@/lib/server/quizzes";
import { isQuizCode, normalizeQuizCode } from "@/lib/quizzes";

// A browser's first answer on a quiz (sent once per browser per quiz by
// lib/quizProgress.ts), so a quiz knows how many people played it.
export async function POST(_request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await recordQuizPlay(code);
  return NextResponse.json({ ok: true });
}
