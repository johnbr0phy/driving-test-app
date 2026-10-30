"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PcocResultsPage() {
  return <ExamResultsPage exam={getExamById("pcoc")!} />;
}
