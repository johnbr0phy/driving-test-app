"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function GulfrnResultsPage() {
  return <ExamResultsPage exam={getExamById("gulfrn")!} />;
}
