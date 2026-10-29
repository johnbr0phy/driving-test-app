"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AunswResultsPage() {
  return <ExamResultsPage exam={getExamById("aunsw")!} />;
}
