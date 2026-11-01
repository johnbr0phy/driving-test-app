"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function SetrafikResultsPage() {
  return <ExamResultsPage exam={getExamById("setrafik")!} />;
}
