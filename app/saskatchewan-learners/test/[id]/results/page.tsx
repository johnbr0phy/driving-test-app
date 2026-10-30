"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CaskResultsPage() {
  return <ExamResultsPage exam={getExamById("cask")!} />;
}
