"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HunterStatsPage() {
  return <ExamStatsPage exam={getExamById("hunter")!} />;
}
