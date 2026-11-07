"use client";

import "@/lib/banks/rotaxi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RotaxiStatsPage() {
  return <ExamStatsPage exam={getExamById("rotaxi")!} />;
}
