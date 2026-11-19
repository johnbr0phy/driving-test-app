"use client";

import "@/lib/banks/crc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CrcStatsPage() {
  return <ExamStatsPage exam={getExamById("crc")!} />;
}
