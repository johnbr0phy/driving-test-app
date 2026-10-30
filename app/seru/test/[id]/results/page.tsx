"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkseruResultsPage() {
  return <ExamResultsPage exam={getExamById("ukseru")!} />;
}
