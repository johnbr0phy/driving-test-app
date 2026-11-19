"use client";

import "@/lib/banks/ita2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Ita2StatsPage() {
  return <ExamStatsPage exam={getExamById("ita2")!} />;
}
