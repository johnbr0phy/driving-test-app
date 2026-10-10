"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function LifeguardStatsPage() {
  return <ExamStatsPage exam={getExamById("lifeguard")!} />;
}
