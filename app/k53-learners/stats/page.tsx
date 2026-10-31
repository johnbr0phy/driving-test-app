"use client";

import "@/lib/banks/zak53";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Zak53StatsPage() {
  return <ExamStatsPage exam={getExamById("zak53")!} />;
}
