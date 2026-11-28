"use client";

import "@/lib/banks/ccht";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CchtStatsPage() {
  return <ExamStatsPage exam={getExamById("ccht")!} />;
}
