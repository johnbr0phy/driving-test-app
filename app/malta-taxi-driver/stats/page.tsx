"use client";

import "@/lib/banks/mttaxi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MttaxiStatsPage() {
  return <ExamStatsPage exam={getExamById("mttaxi")!} />;
}
