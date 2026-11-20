"use client";

import "@/lib/banks/coc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CocStatsPage() {
  return <ExamStatsPage exam={getExamById("coc")!} />;
}
