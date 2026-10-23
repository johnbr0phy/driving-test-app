import { NextResponse } from "next/server";
import { listPublicQuizzes } from "@/lib/server/quizzes";

// The /quizzes library: public quizzes with enough plays, featured first,
// then most played. Served fresh (never prerendered, so a build without
// Firestore credentials succeeds) and cached at the edge for five minutes.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const quizzes = await listPublicQuizzes(100);
    return NextResponse.json({ quizzes }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch (error) {
    console.error("[quizzes/public]", error);
    return NextResponse.json({ quizzes: [] }, { status: 503 });
  }
}
