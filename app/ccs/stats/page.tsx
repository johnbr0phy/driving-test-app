"use client";

import "@/lib/banks/ccs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CcsStatsPage() {
  return <ExamStatsPage exam={getExamById("ccs")!} />;
}
