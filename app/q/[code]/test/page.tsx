"use client";

import { useParams } from "next/navigation";
import { normalizeQuizCode } from "@/lib/quizzes";
import { QuizTest } from "@/components/quiz/QuizTest";

export default function QuizTestPage() {
  const params = useParams();
  const code = normalizeQuizCode(String(params.code ?? ""));
  return <QuizTest code={code} />;
}
