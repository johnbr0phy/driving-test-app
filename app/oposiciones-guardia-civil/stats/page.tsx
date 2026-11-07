"use client";

import "@/lib/banks/esguardia";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EsguardiaStatsPage() {
  return <ExamStatsPage exam={getExamById("esguardia")!} />;
}
