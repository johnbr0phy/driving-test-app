"use client";

import "@/lib/banks/frm1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrmPart1StatsPage() {
  return <ExamStatsPage exam={getExamById("frm1")!} />;
}
