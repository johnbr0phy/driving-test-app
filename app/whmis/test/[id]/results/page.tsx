"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function CawhmisResultsPage() {
  return <ExamResultsPage exam={getExamById("cawhmis")!} />;
}
