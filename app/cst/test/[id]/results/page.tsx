"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CSTResultsPage() {
  return <ExamResultsPage exam={getExamById("cst")!} />;
}
