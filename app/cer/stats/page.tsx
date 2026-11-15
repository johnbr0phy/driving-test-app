"use client";

import "@/lib/banks/hspacer";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HspaCerStatsPage() {
  return <ExamStatsPage exam={getExamById("hspacer")!} />;
}
