"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AuwahResultsPage() {
  return <ExamResultsPage exam={getExamById("auwah")!} />;
}
