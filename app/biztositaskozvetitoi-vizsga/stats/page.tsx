"use client";

import "@/lib/banks/hubizt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HubiztStatsPage() {
  return <ExamStatsPage exam={getExamById("hubizt")!} />;
}
