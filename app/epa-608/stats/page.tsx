"use client";

import "@/lib/banks/epa608";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Epa608StatsPage() {
  return <ExamStatsPage exam={getExamById("epa608")!} />;
}
