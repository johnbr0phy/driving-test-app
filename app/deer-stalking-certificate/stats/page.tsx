"use client";

import "@/lib/banks/ukdsc1";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Ukdsc1StatsPage() {
  return <ExamStatsPage exam={getExamById("ukdsc1")!} />;
}
