"use client";

import "@/lib/banks/caabguard";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AbGuardStatsPage() {
  return <ExamStatsPage exam={getExamById("caabguard")!} />;
}
