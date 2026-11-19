"use client";

import "@/lib/banks/ieplumbt2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IePlumbT2StatsPage() {
  return <ExamStatsPage exam={getExamById("ieplumbt2")!} />;
}
