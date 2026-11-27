"use client";

import "@/lib/banks/hklesfi7";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HksiPaper7StatsPage() {
  return <ExamStatsPage exam={getExamById("hklesfi7")!} />;
}
