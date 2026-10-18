"use client";

import "@/lib/banks/cdlx";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CDLEndorsementsStatsPage() {
  return <ExamStatsPage exam={getExamById("cdlx")!} />;
}
