"use client";

import "@/lib/banks/cdl";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CDLStatsPage() {
  return <ExamStatsPage exam={getExamById("cdl")!} />;
}
