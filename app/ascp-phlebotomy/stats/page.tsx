"use client";

import "@/lib/banks/ascppbt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AscpPbtStatsPage() {
  return <ExamStatsPage exam={getExamById("ascppbt")!} />;
}
