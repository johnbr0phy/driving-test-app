"use client";

import "@/lib/banks/itcilsb2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Itcilsb2StatsPage() {
  return <ExamStatsPage exam={getExamById("itcilsb2")!} />;
}
