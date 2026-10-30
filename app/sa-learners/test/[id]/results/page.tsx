"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AusaResultsPage() {
  return <ExamResultsPage exam={getExamById("ausa")!} />;
}
