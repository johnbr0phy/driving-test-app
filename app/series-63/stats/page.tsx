"use client";

import "@/lib/banks/series63";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series63StatsPage() {
  return <ExamStatsPage exam={getExamById("series63")!} />;
}
