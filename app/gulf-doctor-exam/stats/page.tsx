"use client";

import "@/lib/banks/gulfmd";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function GulfmdStatsPage() {
  return <ExamStatsPage exam={getExamById("gulfmd")!} />;
}
