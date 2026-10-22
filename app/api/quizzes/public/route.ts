import { NextResponse } from "next/server";
import { listPublicQuizzes } from "@/lib/server/quizzes";

// The /quizzes library: public quizzes with enough plays, most played first.
export const revalidate = 300;

export async function GET() {
  const quizzes = await listPublicQuizzes(100);
  return NextResponse.json({ quizzes });
}
