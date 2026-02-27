/**
 * GET /api/community-stats?lang=es
 * Reads globalStats/wrongQuestions via Admin SDK (bypasses Firestore security rules).
 * Returns the pre-aggregated community wrong questions data.
 * When lang=es, replaces question/answer/explanation with Spanish translations.
 */

import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import questionsEs from "@/data/questions_es.json";
import questionsEn from "@/data/questions.json";

type QuestionEntry = {
  questionId: string;
  question: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  explanation?: string;
};

// Build lookup maps from questionId → question data
const esMap = new Map(
  (questionsEs as QuestionEntry[]).map((q) => [q.questionId, q])
);
const enMap = new Map(
  (questionsEn as QuestionEntry[]).map((q) => [q.questionId, q])
);

function getEsAnswerText(q: ReturnType<typeof esMap.get>): string {
  if (!q) return "";
  const map: Record<string, string> = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
  return map[q.correctAnswer] ?? "";
}

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") ?? "en";

  try {
    const db = getAdminDb();
    const snap = await db.collection("globalStats").doc("wrongQuestions").get();

    if (!snap.exists) {
      return NextResponse.json({ questions: [], totalUsers: 0, updatedAt: null });
    }

    const data = snap.data()!;

    // Backfill options from static data if not stored in Firestore yet
    if (Array.isArray(data.questions)) {
      data.questions = data.questions.map((q: { questionId: string; options?: string[] }) => {
        if (q.options && q.options.length > 0) return q;
        const enQ = enMap.get(q.questionId);
        if (!enQ) return q;
        return { ...q, options: [enQ.optionA, enQ.optionB, enQ.optionC, enQ.optionD] };
      });
    }

    if (lang === "es" && Array.isArray(data.questions)) {
      data.questions = data.questions.map((q: { questionId: string; question: string; correctAnswer: string; explanation?: string; options?: string[] }) => {
        const esQ = esMap.get(q.questionId);
        if (!esQ) return q;
        return {
          ...q,
          question: esQ.question,
          options: [esQ.optionA, esQ.optionB, esQ.optionC, esQ.optionD],
          correctAnswer: getEsAnswerText(esQ),
          explanation: esQ.explanation ?? q.explanation ?? "",
        };
      });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[community-stats]", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
