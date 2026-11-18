"use client";

import "@/lib/banks/epa609";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Epa609StatsPage() {
  return <ExamStatsPage exam={getExamById("epa609")!} />;
}
