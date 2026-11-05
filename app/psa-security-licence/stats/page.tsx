"use client";

import "@/lib/banks/iepsa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IePsaStatsPage() {
  return <ExamStatsPage exam={getExamById("iepsa")!} />;
}
