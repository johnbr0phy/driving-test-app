"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function MotorcycleResultsPage() {
  return <ExamResultsPage exam={getExamById("moto")!} />;
}
