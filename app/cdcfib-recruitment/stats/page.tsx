"use client";

import "@/lib/banks/cdcfib";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CdcfibStatsPage() {
  return <ExamStatsPage exam={getExamById("cdcfib")!} />;
}
