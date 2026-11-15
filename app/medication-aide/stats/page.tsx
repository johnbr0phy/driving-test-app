"use client";

import "@/lib/banks/mace";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MaceStatsPage() {
  return <ExamStatsPage exam={getExamById("mace")!} />;
}
