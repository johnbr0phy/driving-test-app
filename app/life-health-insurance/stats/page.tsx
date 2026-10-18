"use client";

import "@/lib/banks/insurance";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function InsuranceStatsPage() {
  return <ExamStatsPage exam={getExamById("insurance")!} />;
}
