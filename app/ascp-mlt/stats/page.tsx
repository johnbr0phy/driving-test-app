"use client";

import "@/lib/banks/ascpmlt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AscpMltStatsPage() {
  return <ExamStatsPage exam={getExamById("ascpmlt")!} />;
}
