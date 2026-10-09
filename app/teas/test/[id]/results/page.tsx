"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function TeasResultsPage() {
  return <ExamResultsPage exam={getExamById("teas")!} />;
}
