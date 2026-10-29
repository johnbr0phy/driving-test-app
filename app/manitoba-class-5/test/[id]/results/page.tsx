"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CambResultsPage() {
  return <ExamResultsPage exam={getExamById("camb")!} />;
}
