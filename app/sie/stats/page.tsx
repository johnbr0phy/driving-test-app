"use client";

import "@/lib/banks/sie";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SieStatsPage() {
  return <ExamStatsPage exam={getExamById("sie")!} />;
}
