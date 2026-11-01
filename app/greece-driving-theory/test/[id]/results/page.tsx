"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function GrdrivingResultsPage() {
  return <ExamResultsPage exam={getExamById("grdriving")!} />;
}
