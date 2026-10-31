"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function SgbttResultsPage() {
  return <ExamResultsPage exam={getExamById("sgbtt")!} />;
}
