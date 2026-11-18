"use client";

import "@/lib/banks/sgsecurity";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgSecurityStatsPage() {
  return <ExamStatsPage exam={getExamById("sgsecurity")!} />;
}
