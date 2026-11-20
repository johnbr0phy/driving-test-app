"use client";

import "@/lib/banks/ukcemap2";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Cemap2StatsPage() {
  return <ExamStatsPage exam={getExamById("ukcemap2")!} />;
}
