import { NextRequest, NextResponse } from "next/server";
import { requireQuizOwner } from "@/lib/server/quizAuth";
import { QuizError, createQuiz, listMyQuizzes, quizLimits } from "@/lib/server/quizzes";
import { quizSummary } from "@/lib/quizzes";

// Quizzes (lib/quizzes.ts). POST makes one for the signed-in account; GET
// lists the account's own, with the plan's limits for the /create page.

export async function POST(request: NextRequest) {
  const auth = await requireQuizOwner(request);
  if (!auth.ok) return auth.response;
  const body = await request.json().catch(() => ({}));
  try {
    const createdVia = body.createdVia === "import" ? "import" : "web";
    const quiz = await createQuiz(auth.owner, { ...body, createdVia });
    return NextResponse.json({ code: quiz.code, quiz: quizSummary(quiz) });
  } catch (error) {
    if (error instanceof QuizError) return NextResponse.json({ error: error.message }, { status: error.status });
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const auth = await requireQuizOwner(request);
  if (!auth.ok) return auth.response;
  const quizzes = await listMyQuizzes(auth.owner.uid);
  return NextResponse.json({ quizzes, limits: quizLimits(auth.owner.isPremium), isPremium: auth.owner.isPremium });
}
