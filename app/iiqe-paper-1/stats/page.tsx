"use client";

import "@/lib/banks/hkiiqe1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IiqePaper1StatsPage() {
  return <ExamStatsPage exam={getExamById("hkiiqe1")!} />;
}
