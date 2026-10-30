"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaautoResultsPage() {
  return <ExamResultsPage exam={getExamById("caauto")!} />;
}
