"use client";

import "@/lib/banks/huelsoseg";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HuelsosegStatsPage() {
  return <ExamStatsPage exam={getExamById("huelsoseg")!} />;
}
