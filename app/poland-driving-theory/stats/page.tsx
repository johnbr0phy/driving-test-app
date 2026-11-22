"use client";

import "@/lib/banks/plteoria";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PlteoriaStatsPage() {
  return <ExamStatsPage exam={getExamById("plteoria")!} />;
}
