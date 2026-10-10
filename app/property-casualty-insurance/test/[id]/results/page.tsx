"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PncResultsPage() {
  return <ExamResultsPage exam={getExamById("pnc")!} />;
}
