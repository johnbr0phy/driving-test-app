"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerResultsPage() {
  return <ExamResultsPage exam={getExamById("foodhandler")!} />;
}
