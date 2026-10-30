"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UksiaResultsPage() {
  return <ExamResultsPage exam={getExamById("uksia")!} />;
}
