"use client";

import "@/lib/banks/faaama";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FaaMechanicAirframeStatsPage() {
  return <ExamStatsPage exam={getExamById("faaama")!} />;
}
