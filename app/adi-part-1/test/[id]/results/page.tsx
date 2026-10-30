"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkadiResultsPage() {
  return <ExamResultsPage exam={getExamById("ukadi")!} />;
}
