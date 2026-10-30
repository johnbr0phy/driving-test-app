"use client";

import "@/lib/banks/police";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PoliceStatsPage() {
  return <ExamStatsPage exam={getExamById("police")!} />;
}
