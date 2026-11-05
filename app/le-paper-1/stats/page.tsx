"use client";

import "@/lib/banks/hklesfi1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HkLePaper1StatsPage() {
  return <ExamStatsPage exam={getExamById("hklesfi1")!} />;
}
