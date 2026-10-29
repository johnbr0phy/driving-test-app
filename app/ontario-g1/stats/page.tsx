"use client";

import "@/lib/banks/caon";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaonStatsPage() {
  return <ExamStatsPage exam={getExamById("caon")!} />;
}
