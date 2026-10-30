"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AursaResultsPage() {
  return <ExamResultsPage exam={getExamById("aursa")!} />;
}
