"use client";

import "@/lib/banks/aufatas";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function TasFirearmsStatsPage() {
  return <ExamStatsPage exam={getExamById("aufatas")!} />;
}
