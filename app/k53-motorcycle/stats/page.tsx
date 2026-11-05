"use client";

import "@/lib/banks/zak53moto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Zak53motoStatsPage() {
  return <ExamStatsPage exam={getExamById("zak53moto")!} />;
}
