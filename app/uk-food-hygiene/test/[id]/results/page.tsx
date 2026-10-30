"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function UkfoodResultsPage() {
  return <ExamResultsPage exam={getExamById("ukfood")!} />;
}
