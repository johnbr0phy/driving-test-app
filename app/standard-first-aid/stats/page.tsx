"use client";

import "@/lib/banks/casfa";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CasfaStatsPage() {
  return <ExamStatsPage exam={getExamById("casfa")!} />;
}
