"use client";

import "@/lib/banks/nzfirstaid";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzFirstAidStatsPage() {
  return <ExamStatsPage exam={getExamById("nzfirstaid")!} />;
}
