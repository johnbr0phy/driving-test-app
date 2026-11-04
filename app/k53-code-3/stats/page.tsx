"use client";

import "@/lib/banks/zak53c3";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Zak53c3StatsPage() {
  return <ExamStatsPage exam={getExamById("zak53c3")!} />;
}
