"use client";

import "@/lib/banks/ea1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EnrolledAgentPart1StatsPage() {
  return <ExamStatsPage exam={getExamById("ea1")!} />;
}
