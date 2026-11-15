"use client";

import "@/lib/banks/cmaa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CmaaStatsPage() {
  return <ExamStatsPage exam={getExamById("cmaa")!} />;
}
