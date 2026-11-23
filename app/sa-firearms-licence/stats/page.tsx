"use client";

import "@/lib/banks/aufasa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SaFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufasa")!} />;
}
