"use client";

import "@/lib/banks/cpcta";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpctaStatsPage() {
  return <ExamStatsPage exam={getExamById("cpcta")!} />;
}
