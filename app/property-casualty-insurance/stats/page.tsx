"use client";

import "@/lib/banks/pnc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PncStatsPage() {
  return <ExamStatsPage exam={getExamById("pnc")!} />;
}
