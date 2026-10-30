"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkcareResultsPage() {
  return <ExamResultsPage exam={getExamById("ukcare")!} />;
}
