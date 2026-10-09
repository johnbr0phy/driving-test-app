"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Epa608StatsPage() {
  return <ExamStatsPage exam={getExamById("epa608")!} />;
}
