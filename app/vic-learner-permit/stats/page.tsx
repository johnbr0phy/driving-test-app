"use client";

import "@/lib/banks/auvic";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuvicStatsPage() {
  return <ExamStatsPage exam={getExamById("auvic")!} />;
}
