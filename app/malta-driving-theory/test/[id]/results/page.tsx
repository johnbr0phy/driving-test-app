"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function MttheoryResultsPage() {
  return <ExamResultsPage exam={getExamById("mttheory")!} />;
}
