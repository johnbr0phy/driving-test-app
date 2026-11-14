"use client";

import "@/lib/banks/frcode";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FrcodeStatsPage() {
  return <ExamStatsPage exam={getExamById("frcode")!} />;
}
