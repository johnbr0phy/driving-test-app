"use client";

import "@/lib/banks/osha30";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Osha30StatsPage() {
  return <ExamStatsPage exam={getExamById("osha30")!} />;
}
