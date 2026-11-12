"use client";

import "@/lib/banks/ukg3";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Ukg3StatsPage() {
  return <ExamStatsPage exam={getExamById("ukg3")!} />;
}
