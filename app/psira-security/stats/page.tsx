"use client";

import "@/lib/banks/zapsira";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ZaPsiraStatsPage() {
  return <ExamStatsPage exam={getExamById("zapsira")!} />;
}
