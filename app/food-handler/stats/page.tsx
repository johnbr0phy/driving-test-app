"use client";

import "@/lib/banks/foodhandler";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FoodhandlerStatsPage() {
  return <ExamStatsPage exam={getExamById("foodhandler")!} />;
}
