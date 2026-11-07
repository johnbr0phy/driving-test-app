"use client";

import "@/lib/banks/fitruck";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FitruckStatsPage() {
  return <ExamStatsPage exam={getExamById("fitruck")!} />;
}
