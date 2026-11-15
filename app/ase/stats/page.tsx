"use client";

import "@/lib/banks/ase";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AseStatsPage() {
  return <ExamStatsPage exam={getExamById("ase")!} />;
}
