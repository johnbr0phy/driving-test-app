"use client";

import "@/lib/banks/hukresz";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HukreszStatsPage() {
  return <ExamStatsPage exam={getExamById("hukresz")!} />;
}
