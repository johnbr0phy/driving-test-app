"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function EmtResultsPage() {
  return <ExamResultsPage exam={getExamById("emt")!} />;
}
