"use client";

import "@/lib/banks/cct";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CctStatsPage() {
  return <ExamStatsPage exam={getExamById("cct")!} />;
}
