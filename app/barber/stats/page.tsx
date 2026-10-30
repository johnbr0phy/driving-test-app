"use client";

import "@/lib/banks/barber";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BarberStatsPage() {
  return <ExamStatsPage exam={getExamById("barber")!} />;
}
