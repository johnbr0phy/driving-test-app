"use client";

import "@/lib/banks/caairbrake";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function OntarioAirBrakeStatsPage() {
  return <ExamStatsPage exam={getExamById("caairbrake")!} />;
}
