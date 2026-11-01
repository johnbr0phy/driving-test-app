"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function HukreszResultsPage() {
  return <ExamResultsPage exam={getExamById("hukresz")!} />;
}
