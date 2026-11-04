"use client";

import "@/lib/banks/fladjuster";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FlAdjusterStatsPage() {
  return <ExamStatsPage exam={getExamById("fladjuster")!} />;
}
