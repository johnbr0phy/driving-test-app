"use client";

import "@/lib/banks/aucit";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AucitStatsPage() {
  return <ExamStatsPage exam={getExamById("aucit")!} />;
}
