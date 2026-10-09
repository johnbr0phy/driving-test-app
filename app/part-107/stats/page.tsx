"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Part107StatsPage() {
  return <ExamStatsPage exam={getExamById("part107")!} />;
}
