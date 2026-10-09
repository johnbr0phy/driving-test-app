"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function Epa608ResultsPage() {
  return <ExamResultsPage exam={getExamById("epa608")!} />;
}
