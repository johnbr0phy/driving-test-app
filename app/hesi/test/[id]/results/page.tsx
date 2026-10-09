"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function HesiResultsPage() {
  return <ExamResultsPage exam={getExamById("hesi")!} />;
}
