"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkfawResultsPage() {
  return <ExamResultsPage exam={getExamById("ukfaw")!} />;
}
