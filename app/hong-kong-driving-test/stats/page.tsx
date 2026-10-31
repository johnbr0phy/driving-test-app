"use client";

import "@/lib/banks/hkdrive";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HkdriveStatsPage() {
  return <ExamStatsPage exam={getExamById("hkdrive")!} />;
}
