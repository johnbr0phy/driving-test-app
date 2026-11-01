"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PtimtResultsPage() {
  return <ExamResultsPage exam={getExamById("ptimt")!} />;
}
