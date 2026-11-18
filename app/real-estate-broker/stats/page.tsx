"use client";

import "@/lib/banks/realestatebroker";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RealEstateBrokerStatsPage() {
  return <ExamStatsPage exam={getExamById("realestatebroker")!} />;
}
