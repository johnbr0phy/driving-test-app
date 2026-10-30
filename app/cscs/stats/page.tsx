"use client";

import "@/lib/banks/cscs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CscsStatsPage() {
  return <ExamStatsPage exam={getExamById("cscs")!} />;
}
