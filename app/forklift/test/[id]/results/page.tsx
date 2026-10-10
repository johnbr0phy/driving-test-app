"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function ForkliftResultsPage() {
  return <ExamResultsPage exam={getExamById("forklift")!} />;
}
