"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function VtneResultsPage() {
  return <ExamResultsPage exam={getExamById("vtne")!} />;
}
