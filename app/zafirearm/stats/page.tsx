"use client";

import "@/lib/banks/zafirearm";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ZaFirearmStatsPage() {
  return <ExamStatsPage exam={getExamById("zafirearm")!} />;
}
