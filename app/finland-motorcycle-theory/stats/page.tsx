"use client";

import "@/lib/banks/fimoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FimotoStatsPage() {
  return <ExamStatsPage exam={getExamById("fimoto")!} />;
}
