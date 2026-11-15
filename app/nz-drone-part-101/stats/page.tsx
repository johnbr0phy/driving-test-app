"use client";

import "@/lib/banks/nzdrone";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzDroneStatsPage() {
  return <ExamStatsPage exam={getExamById("nzdrone")!} />;
}
