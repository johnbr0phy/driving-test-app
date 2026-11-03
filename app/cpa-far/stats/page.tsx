"use client";

import "@/lib/banks/cpafar";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaFarStatsPage() {
  return <ExamStatsPage exam={getExamById("cpafar")!} />;
}
