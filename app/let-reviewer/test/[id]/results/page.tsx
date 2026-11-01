"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PhletResultsPage() {
  return <ExamResultsPage exam={getExamById("phlet")!} />;
}
