"use client";

import "@/lib/banks/cosmetology";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CosmetologyStatsPage() {
  return <ExamStatsPage exam={getExamById("cosmetology")!} />;
}
