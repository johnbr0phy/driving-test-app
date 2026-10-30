"use client";

import "@/lib/banks/ukaplh";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkaplhStatsPage() {
  return <ExamStatsPage exam={getExamById("ukaplh")!} />;
}
