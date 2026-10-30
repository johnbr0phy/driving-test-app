"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AuwaResultsPage() {
  return <ExamResultsPage exam={getExamById("auwa")!} />;
}
