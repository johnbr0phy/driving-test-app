"use client";

import "@/lib/banks/semedb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SemedbStatsPage() {
  return <ExamStatsPage exam={getExamById("semedb")!} />;
}
