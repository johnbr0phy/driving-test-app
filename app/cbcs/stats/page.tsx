"use client";

import "@/lib/banks/cbcs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CbcsStatsPage() {
  return <ExamStatsPage exam={getExamById("cbcs")!} />;
}
