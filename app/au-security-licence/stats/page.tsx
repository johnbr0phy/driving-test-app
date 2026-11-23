"use client";

import "@/lib/banks/ausecurity";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuSecurityStatsPage() {
  return <ExamStatsPage exam={getExamById("ausecurity")!} />;
}
