"use client";

import "@/lib/banks/aufirearmswa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function WaFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufirearmswa")!} />;
}
