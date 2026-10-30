"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function AuqldResultsPage() {
  return <ExamResultsPage exam={getExamById("auqld")!} />;
}
