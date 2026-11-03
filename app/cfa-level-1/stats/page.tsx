"use client";

import "@/lib/banks/cfal1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CfaLevel1StatsPage() {
  return <ExamStatsPage exam={getExamById("cfal1")!} />;
}
