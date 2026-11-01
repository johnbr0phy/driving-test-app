"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function NgpoliceResultsPage() {
  return <ExamResultsPage exam={getExamById("ngpolice")!} />;
}
