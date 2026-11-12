"use client";

import "@/lib/banks/itpatente";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ItpatenteStatsPage() {
  return <ExamStatsPage exam={getExamById("itpatente")!} />;
}
