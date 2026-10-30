"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CapswResultsPage() {
  return <ExamResultsPage exam={getExamById("capsw")!} />;
}
