"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function BarberResultsPage() {
  return <ExamResultsPage exam={getExamById("barber")!} />;
}
