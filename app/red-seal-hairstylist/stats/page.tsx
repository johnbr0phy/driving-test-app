"use client";

import "@/lib/banks/carshair";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CarshairStatsPage() {
  return <ExamStatsPage exam={getExamById("carshair")!} />;
}
