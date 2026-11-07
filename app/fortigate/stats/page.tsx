"use client";

import "@/lib/banks/fortigate";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FortigateStatsPage() {
  return <ExamStatsPage exam={getExamById("fortigate")!} />;
}
