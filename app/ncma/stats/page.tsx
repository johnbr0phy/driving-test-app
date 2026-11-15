"use client";

import "@/lib/banks/ncma";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NcmaStatsPage() {
  return <ExamStatsPage exam={getExamById("ncma")!} />;
}
