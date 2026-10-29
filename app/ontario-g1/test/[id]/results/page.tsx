"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaonResultsPage() {
  return <ExamResultsPage exam={getExamById("caon")!} />;
}
