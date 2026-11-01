"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CdcfibResultsPage() {
  return <ExamResultsPage exam={getExamById("cdcfib")!} />;
}
