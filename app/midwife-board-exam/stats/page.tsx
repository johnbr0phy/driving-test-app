"use client";

import "@/lib/banks/phmidwife";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhmidwifeStatsPage() {
  return <ExamStatsPage exam={getExamById("phmidwife")!} />;
}
