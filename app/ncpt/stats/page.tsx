"use client";

import "@/lib/banks/ncpt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NcptStatsPage() {
  return <ExamStatsPage exam={getExamById("ncpt")!} />;
}
