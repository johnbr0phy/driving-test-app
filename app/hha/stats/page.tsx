"use client";

import "@/lib/banks/hha";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HhaStatsPage() {
  return <ExamStatsPage exam={getExamById("hha")!} />;
}
