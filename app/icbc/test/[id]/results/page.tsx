"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CabcResultsPage() {
  return <ExamResultsPage exam={getExamById("cabc")!} />;
}
