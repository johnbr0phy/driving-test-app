"use client";

import "@/lib/banks/ngarmy";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NgarmyStatsPage() {
  return <ExamStatsPage exam={getExamById("ngarmy")!} />;
}
