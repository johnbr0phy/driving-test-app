"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function HamResultsPage() {
  return <ExamResultsPage exam={getExamById("ham")!} />;
}
