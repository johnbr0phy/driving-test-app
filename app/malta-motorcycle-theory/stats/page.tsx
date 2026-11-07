"use client";

import "@/lib/banks/mtmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MtmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("mtmoto")!} />;
}
