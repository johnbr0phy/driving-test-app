"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PhlebResultsPage() {
  return <ExamResultsPage exam={getExamById("phleb")!} />;
}
