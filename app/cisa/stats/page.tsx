"use client";

import "@/lib/banks/cisa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CisaStatsPage() {
  return <ExamStatsPage exam={getExamById("cisa")!} />;
}
