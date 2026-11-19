"use client";

import "@/lib/banks/ascpmls";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AscpMlsStatsPage() {
  return <ExamStatsPage exam={getExamById("ascpmls")!} />;
}
