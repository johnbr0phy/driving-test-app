"use client";

import "@/lib/banks/moto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MotorcycleStatsPage() {
  return <ExamStatsPage exam={getExamById("moto")!} />;
}
