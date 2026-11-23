"use client";

import "@/lib/banks/series6";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series6StatsPage() {
  return <ExamStatsPage exam={getExamById("series6")!} />;
}
