"use client";

import "@/lib/banks/series7";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series7StatsPage() {
  return <ExamStatsPage exam={getExamById("series7")!} />;
}
