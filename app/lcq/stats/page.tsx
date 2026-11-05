"use client";

import "@/lib/banks/nzlcq";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzlcqStatsPage() {
  return <ExamStatsPage exam={getExamById("nzlcq")!} />;
}
