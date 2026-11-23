"use client";

import "@/lib/banks/ncmhce";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NcmhceStatsPage() {
  return <ExamStatsPage exam={getExamById("ncmhce")!} />;
}
