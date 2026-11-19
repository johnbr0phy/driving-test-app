"use client";

import "@/lib/banks/trapper";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TrapperStatsPage() {
  return <ExamStatsPage exam={getExamById("trapper")!} />;
}
