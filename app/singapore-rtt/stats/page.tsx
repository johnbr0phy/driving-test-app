"use client";

import "@/lib/banks/sgrtt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SgrttStatsPage() {
  return <ExamStatsPage exam={getExamById("sgrtt")!} />;
}
