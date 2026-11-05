"use client";

import "@/lib/banks/zasaps";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ZasapsStatsPage() {
  return <ExamStatsPage exam={getExamById("zasaps")!} />;
}
