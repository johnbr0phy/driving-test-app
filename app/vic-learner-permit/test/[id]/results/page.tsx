"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AuvicResultsPage() {
  return <ExamResultsPage exam={getExamById("auvic")!} />;
}
