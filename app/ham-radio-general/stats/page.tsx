"use client";

import "@/lib/banks/hamgeneral";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HamgeneralStatsPage() {
  return <ExamStatsPage exam={getExamById("hamgeneral")!} />;
}
