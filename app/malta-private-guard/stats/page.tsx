"use client";

import "@/lib/banks/mtguard";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MtGuardStatsPage() {
  return <ExamStatsPage exam={getExamById("mtguard")!} />;
}
