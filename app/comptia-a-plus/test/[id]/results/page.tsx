"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AplusResultsPage() {
  return <ExamResultsPage exam={getExamById("aplus")!} />;
}
