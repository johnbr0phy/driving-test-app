"use client";

import "@/lib/banks/ptmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PtmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("ptmoto")!} />;
}
