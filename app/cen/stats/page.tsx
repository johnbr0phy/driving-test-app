"use client";

import "@/lib/banks/cen";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CenStatsPage() {
  return <ExamStatsPage exam={getExamById("cen")!} />;
}
