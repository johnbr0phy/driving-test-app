"use client";

import "@/lib/banks/cacit";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CacitStatsPage() {
  return <ExamStatsPage exam={getExamById("cacit")!} />;
}
