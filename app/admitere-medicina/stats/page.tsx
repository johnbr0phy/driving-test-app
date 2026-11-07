"use client";

import "@/lib/banks/roadmed";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RoadmedStatsPage() {
  return <ExamStatsPage exam={getExamById("roadmed")!} />;
}
