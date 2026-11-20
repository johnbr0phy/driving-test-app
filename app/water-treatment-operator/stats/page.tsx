"use client";

import "@/lib/banks/waterop";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function WaterOpStatsPage() {
  return <ExamStatsPage exam={getExamById("waterop")!} />;
}
