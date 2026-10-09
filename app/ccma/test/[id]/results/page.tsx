"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CcmaResultsPage() {
  return <ExamResultsPage exam={getExamById("ccma")!} />;
}
