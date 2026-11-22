"use client";

import "@/lib/banks/series66";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series66StatsPage() {
  return <ExamStatsPage exam={getExamById("series66")!} />;
}
