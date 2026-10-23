"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import { normalizeQuizCode } from "@/lib/quizzes";
import { QuizResults } from "@/components/quiz/QuizResults";

export default function QuizResultsPage() {
  const params = useParams();
  const code = normalizeQuizCode(String(params.code ?? ""));
  return (
    <Suspense fallback={<div className="flex-1 bg-gray-50 dark:bg-gray-950" />}>
      <QuizResults code={code} />
    </Suspense>
  );
}
