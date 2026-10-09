"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function InsuranceResultsPage() {
  return <ExamResultsPage exam={getExamById("insurance")!} />;
}
