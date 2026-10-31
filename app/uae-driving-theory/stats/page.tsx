"use client";

import "@/lib/banks/aerta";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AertaStatsPage() {
  return <ExamStatsPage exam={getExamById("aerta")!} />;
}
