"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkcarResultsPage() {
  return <ExamResultsPage exam={getExamById("ukcar")!} />;
}
