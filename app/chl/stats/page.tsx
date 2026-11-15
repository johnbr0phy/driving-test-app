"use client";

import "@/lib/banks/hspachl";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HspaChlStatsPage() {
  return <ExamStatsPage exam={getExamById("hspachl")!} />;
}
