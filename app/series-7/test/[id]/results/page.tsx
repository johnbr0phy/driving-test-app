"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function Series7ResultsPage() {
  return <ExamResultsPage exam={getExamById("series7")!} />;
}
