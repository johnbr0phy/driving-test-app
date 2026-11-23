"use client";

import "@/lib/banks/uksqe1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkSqe1StatsPage() {
  return <ExamStatsPage exam={getExamById("uksqe1")!} />;
}
