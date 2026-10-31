"use client";

import "@/lib/banks/mykpp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MykppStatsPage() {
  return <ExamStatsPage exam={getExamById("mykpp")!} />;
}
