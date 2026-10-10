"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CprResultsPage() {
  return <ExamResultsPage exam={getExamById("cpr")!} />;
}
