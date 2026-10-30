"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkmotoResultsPage() {
  return <ExamResultsPage exam={getExamById("ukmoto")!} />;
}
