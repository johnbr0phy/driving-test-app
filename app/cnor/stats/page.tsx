"use client";

import "@/lib/banks/cnor";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CnorStatsPage() {
  return <ExamStatsPage exam={getExamById("cnor")!} />;
}
