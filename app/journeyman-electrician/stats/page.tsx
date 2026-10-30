"use client";

import "@/lib/banks/jelec";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function JelecStatsPage() {
  return <ExamStatsPage exam={getExamById("jelec")!} />;
}
