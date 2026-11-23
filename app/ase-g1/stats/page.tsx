"use client";

import "@/lib/banks/aseg1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AseG1StatsPage() {
  return <ExamStatsPage exam={getExamById("aseg1")!} />;
}
