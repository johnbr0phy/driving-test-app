"use client";

import "@/lib/banks/series65";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Series65StatsPage() {
  return <ExamStatsPage exam={getExamById("series65")!} />;
}
