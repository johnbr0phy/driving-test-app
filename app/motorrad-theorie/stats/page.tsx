"use client";

import "@/lib/banks/demotorrad";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DemotorradStatsPage() {
  return <ExamStatsPage exam={getExamById("demotorrad")!} />;
}
