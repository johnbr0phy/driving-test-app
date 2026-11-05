"use client";

import "@/lib/banks/phinsurance";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhinsuranceStatsPage() {
  return <ExamStatsPage exam={getExamById("phinsurance")!} />;
}
