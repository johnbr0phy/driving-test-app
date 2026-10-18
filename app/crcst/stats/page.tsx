"use client";

import "@/lib/banks/crcst";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CRCSTStatsPage() {
  return <ExamStatsPage exam={getExamById("crcst")!} />;
}
