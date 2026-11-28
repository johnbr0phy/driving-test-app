"use client";

import "@/lib/banks/txlifeonly";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TexasLifeAgentStatsPage() {
  return <ExamStatsPage exam={getExamById("txlifeonly")!} />;
}
