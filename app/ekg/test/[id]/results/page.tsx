"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CetResultsPage() {
  return <ExamResultsPage exam={getExamById("cet")!} />;
}
