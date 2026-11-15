"use client";

import "@/lib/banks/aufirearmsnsw";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NswFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufirearmsnsw")!} />;
}
