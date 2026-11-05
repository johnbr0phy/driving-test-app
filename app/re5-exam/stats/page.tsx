"use client";

import "@/lib/banks/zare5";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Zare5StatsPage() {
  return <ExamStatsPage exam={getExamById("zare5")!} />;
}
