"use client";

import "@/lib/banks/nzsecurity";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzsecurityStatsPage() {
  return <ExamStatsPage exam={getExamById("nzsecurity")!} />;
}
