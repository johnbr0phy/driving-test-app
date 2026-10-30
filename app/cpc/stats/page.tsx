"use client";

import "@/lib/banks/cpc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpcStatsPage() {
  return <ExamStatsPage exam={getExamById("cpc")!} />;
}
