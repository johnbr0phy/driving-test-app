"use client";

import "@/lib/banks/nzboat";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzBoatStatsPage() {
  return <ExamStatsPage exam={getExamById("nzboat")!} />;
}
