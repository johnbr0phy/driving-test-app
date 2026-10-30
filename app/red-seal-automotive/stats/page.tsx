"use client";

import "@/lib/banks/caauto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaautoStatsPage() {
  return <ExamStatsPage exam={getExamById("caauto")!} />;
}
