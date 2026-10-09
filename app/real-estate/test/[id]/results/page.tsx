"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function RealestateResultsPage() {
  return <ExamResultsPage exam={getExamById("realestate")!} />;
}
