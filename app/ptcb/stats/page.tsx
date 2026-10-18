"use client";

import "@/lib/banks/ptcb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PtcbStatsPage() {
  return <ExamStatsPage exam={getExamById("ptcb")!} />;
}
