"use client";

import "@/lib/banks/cacarp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RedSealCarpenterStatsPage() {
  return <ExamStatsPage exam={getExamById("cacarp")!} />;
}
