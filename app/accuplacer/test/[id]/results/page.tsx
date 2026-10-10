"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AccuplacerResultsPage() {
  return <ExamResultsPage exam={getExamById("accuplacer")!} />;
}
