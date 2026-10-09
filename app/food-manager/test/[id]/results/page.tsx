"use client";

import { ExamResultsPage } from "@/components/exam/ExamResultsPage";
import { getExamById } from "@/lib/exams";

export default function FoodmgrResultsPage() {
  return <ExamResultsPage exam={getExamById("foodmgr")!} />;
}
