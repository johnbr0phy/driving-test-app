"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { normalizeQuizCode } from "@/lib/quizzes";
import { QuizPractice } from "@/components/quiz/QuizPractice";

export default function QuizPracticePage() {
  const params = useParams();
  const code = normalizeQuizCode(String(params.code ?? ""));
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <QuizPractice code={code} />
    </Suspense>
  );
}
