"use client";

import "@/lib/banks/nzfirearms";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("nzfirearms")!} />;
}
