"use client";

import "@/lib/banks/plcpc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PlcpcStatsPage() {
  return <ExamStatsPage exam={getExamById("plcpc")!} />;
}
