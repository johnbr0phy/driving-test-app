"use client";

import "@/lib/banks/caqc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CaqcStatsPage() {
  return <ExamStatsPage exam={getExamById("caqc")!} />;
}
