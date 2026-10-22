"use client";

import { useParams } from "next/navigation";
import { normalizeQuizCode } from "@/lib/quizzes";
import { QuizReport } from "@/components/quiz/QuizReport";

export default function QuizReportPage() {
  const params = useParams();
  const code = normalizeQuizCode(String(params.code ?? ""));
  return <QuizReport code={code} />;
}
