"use client";

import "@/lib/banks/masterelec";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MasterelecStatsPage() {
  return <ExamStatsPage exam={getExamById("masterelec")!} />;
}
