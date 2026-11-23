"use client";

import "@/lib/banks/cagas3";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GasTech3StatsPage() {
  return <ExamStatsPage exam={getExamById("cagas3")!} />;
}
