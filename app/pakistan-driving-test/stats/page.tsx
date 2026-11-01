"use client";

import "@/lib/banks/pkdrive";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PkdriveStatsPage() {
  return <ExamStatsPage exam={getExamById("pkdrive")!} />;
}
