"use client";

import "@/lib/banks/frvtc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrvtcStatsPage() {
  return <ExamStatsPage exam={getExamById("frvtc")!} />;
}
