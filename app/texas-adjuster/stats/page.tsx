"use client";

import "@/lib/banks/txadjuster";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TxAdjusterStatsPage() {
  return <ExamStatsPage exam={getExamById("txadjuster")!} />;
}
