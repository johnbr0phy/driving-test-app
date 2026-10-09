"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CDLEndorsementsResultsPage() {
  return <ExamResultsPage exam={getExamById("cdlx")!} />;
}
