"use client";

import "@/lib/banks/hklesfi8";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HksiPaper8StatsPage() {
  return <ExamStatsPage exam={getExamById("hklesfi8")!} />;
}
