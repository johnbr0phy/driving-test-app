"use client";

import "@/lib/banks/plbron";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PlbronStatsPage() {
  return <ExamStatsPage exam={getExamById("plbron")!} />;
}
