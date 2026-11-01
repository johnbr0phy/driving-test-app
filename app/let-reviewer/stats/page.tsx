"use client";

import "@/lib/banks/phlet";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhletStatsPage() {
  return <ExamStatsPage exam={getExamById("phlet")!} />;
}
