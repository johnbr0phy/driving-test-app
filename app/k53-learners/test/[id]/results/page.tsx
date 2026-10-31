"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function Zak53ResultsPage() {
  return <ExamResultsPage exam={getExamById("zak53")!} />;
}
