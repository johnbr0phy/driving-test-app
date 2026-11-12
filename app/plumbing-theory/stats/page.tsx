"use client";

import "@/lib/banks/ukplumb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkplumbStatsPage() {
  return <ExamStatsPage exam={getExamById("ukplumb")!} />;
}
