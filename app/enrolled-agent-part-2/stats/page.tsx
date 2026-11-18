"use client";

import "@/lib/banks/ea2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EnrolledAgentPart2StatsPage() {
  return <ExamStatsPage exam={getExamById("ea2")!} />;
}
