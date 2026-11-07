"use client";

import "@/lib/banks/grmoto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GrmotoStatsPage() {
  return <ExamStatsPage exam={getExamById("grmoto")!} />;
}
