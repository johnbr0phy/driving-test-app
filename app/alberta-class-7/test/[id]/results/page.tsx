"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaabResultsPage() {
  return <ExamResultsPage exam={getExamById("caab")!} />;
}
