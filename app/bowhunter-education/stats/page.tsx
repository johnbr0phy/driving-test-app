"use client";

import "@/lib/banks/bowhunter";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BowhunterStatsPage() {
  return <ExamStatsPage exam={getExamById("bowhunter")!} />;
}
