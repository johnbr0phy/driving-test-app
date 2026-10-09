"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function PtcbResultsPage() {
  return <ExamResultsPage exam={getExamById("ptcb")!} />;
}
