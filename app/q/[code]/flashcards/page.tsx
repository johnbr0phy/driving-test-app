"use client";

import { useParams } from "next/navigation";
import { normalizeQuizCode } from "@/lib/quizzes";
import { QuizFlashcards } from "@/components/quiz/QuizFlashcards";

export default function QuizFlashcardsPage() {
  const params = useParams();
  const code = normalizeQuizCode(String(params.code ?? ""));
  return <QuizFlashcards code={code} />;
}
