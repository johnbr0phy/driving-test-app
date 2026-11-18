"use client";

import "@/lib/banks/nccco";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NcccoStatsPage() {
  return <ExamStatsPage exam={getExamById("nccco")!} />;
}
