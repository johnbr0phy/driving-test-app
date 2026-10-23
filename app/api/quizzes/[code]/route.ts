import { NextRequest, NextResponse } from "next/server";
import { optionalCaller, requireQuizOwner } from "@/lib/server/quizAuth";
import { QuizError, deleteQuiz, getQuiz, setQuizFeatured, updateQuiz } from "@/lib/server/quizzes";
import { isQuizCode, normalizeQuizCode, quizPublic } from "@/lib/quizzes";

// One quiz. GET is what the play page shows (anyone with the link, or only
// the owner for a private quiz); PATCH and DELETE are the owner's.

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  const quiz = await getQuiz(code);
  if (!quiz) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  const caller = await optionalCaller(request);
  const mine = !!caller && (caller.uid === quiz.ownerUid || caller.admin);
  if (quiz.visibility === "private" && !mine) {
    return NextResponse.json({ error: caller ? "This quiz is private" : "Sign in to see this quiz", private: true }, { status: caller ? 403 : 401 });
  }
  return NextResponse.json(quizPublic(quiz, mine));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  const auth = await requireQuizOwner(request);
  if (!auth.ok) return auth.response;
  const body = await request.json().catch(() => ({}));
  try {
    // A site admin may feature any quiz (the gallery's editor's picks) without owning it.
    if (auth.caller.admin && typeof body.featured === "boolean") {
      await setQuizFeatured(code, body.featured);
      const rest = Object.keys(body).filter((k) => k !== "featured");
      if (!rest.length) return NextResponse.json(quizPublic((await getQuiz(code))!, true));
    }
    const quiz = await updateQuiz(auth.owner, code, body);
    return NextResponse.json(quizPublic(quiz, true));
  } catch (error) {
    if (error instanceof QuizError) return NextResponse.json({ error: error.message }, { status: error.status });
    throw error;
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const code = normalizeQuizCode((await params).code);
  if (!isQuizCode(code)) return NextResponse.json({ error: "No such quiz" }, { status: 404 });
  const auth = await requireQuizOwner(request);
  if (!auth.ok) return auth.response;
  try {
    await deleteQuiz(auth.owner, code);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof QuizError) return NextResponse.json({ error: error.message }, { status: error.status });
    throw error;
  }
}
