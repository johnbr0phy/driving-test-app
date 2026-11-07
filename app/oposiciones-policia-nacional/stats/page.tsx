"use client";

import "@/lib/banks/espolicia";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function EspoliciaStatsPage() {
  return <ExamStatsPage exam={getExamById("espolicia")!} />;
}
