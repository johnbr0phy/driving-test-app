"use client";

import "@/lib/banks/ea3";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EnrolledAgentPart3StatsPage() {
  return <ExamStatsPage exam={getExamById("ea3")!} />;
}
