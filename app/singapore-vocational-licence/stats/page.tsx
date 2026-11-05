"use client";

import "@/lib/banks/sgvl";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgvlStatsPage() {
  return <ExamStatsPage exam={getExamById("sgvl")!} />;
}
