"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FoodmgrStatsPage() {
  return <ExamStatsPage exam={getExamById("foodmgr")!} />;
}
