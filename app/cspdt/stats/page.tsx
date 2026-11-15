"use client";

import "@/lib/banks/cbspd";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CbspdCspdtStatsPage() {
  return <ExamStatsPage exam={getExamById("cbspd")!} />;
}
