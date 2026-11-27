"use client";

import "@/lib/banks/ukr01";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CiiR01StatsPage() {
  return <ExamStatsPage exam={getExamById("ukr01")!} />;
}
