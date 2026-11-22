"use client";

import "@/lib/banks/shrmcp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ShrmCpStatsPage() {
  return <ExamStatsPage exam={getExamById("shrmcp")!} />;
}
