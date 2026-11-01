"use client";

import "@/lib/banks/ngcustoms";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NgcustomsStatsPage() {
  return <ExamStatsPage exam={getExamById("ngcustoms")!} />;
}
