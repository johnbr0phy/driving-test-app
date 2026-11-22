"use client";

import "@/lib/banks/oacp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function OacpStatsPage() {
  return <ExamStatsPage exam={getExamById("oacp")!} />;
}
