"use client";

import "@/lib/banks/phnle";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhnleStatsPage() {
  return <ExamStatsPage exam={getExamById("phnle")!} />;
}
