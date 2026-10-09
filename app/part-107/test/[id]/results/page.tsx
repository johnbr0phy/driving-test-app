"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function Part107ResultsPage() {
  return <ExamResultsPage exam={getExamById("part107")!} />;
}
