import { NextRequest, NextResponse } from "next/server";
import { requireQuizOwner } from "@/lib/server/quizAuth";
import { QuizError } from "@/lib/server/quizzes";
import { generateQuiz } from "@/lib/server/quizGenerate";

// /create's paste box: material in, a title, description and questions out
// (nothing is saved until the person reviews them and presses Save).
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const auth = await requireQuizOwner(request);
  if (!auth.ok) return auth.response;
  const body = await request.json().catch(() => ({}));
  try {
    const generated = await generateQuiz(auth.owner, body);
    return NextResponse.json(generated);
  } catch (error) {
    if (error instanceof QuizError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error("[quizzes/generate]", error);
    return NextResponse.json({ error: "Couldn't write the questions. Try again." }, { status: 500 });
  }
}
