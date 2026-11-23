"use client";

import "@/lib/banks/frmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("frmoto")!} />;
}
