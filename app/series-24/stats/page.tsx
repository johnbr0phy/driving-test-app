"use client";

import "@/lib/banks/series24";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series24StatsPage() {
  return <ExamStatsPage exam={getExamById("series24")!} />;
}
