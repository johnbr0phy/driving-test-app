"use client";

import "@/lib/banks/caelec";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaelecStatsPage() {
  return <ExamStatsPage exam={getExamById("caelec")!} />;
}
