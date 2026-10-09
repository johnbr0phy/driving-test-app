"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function DanbResultsPage() {
  return <ExamResultsPage exam={getExamById("danb")!} />;
}
