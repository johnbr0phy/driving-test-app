"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PhltoResultsPage() {
  return <ExamResultsPage exam={getExamById("phlto")!} />;
}
