"use client";

import "@/lib/banks/fihygiene";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FihygieneStatsPage() {
  return <ExamStatsPage exam={getExamById("fihygiene")!} />;
}
