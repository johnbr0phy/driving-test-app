"use client";

import "@/lib/banks/dkteori";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DkteoriStatsPage() {
  return <ExamStatsPage exam={getExamById("dkteori")!} />;
}
