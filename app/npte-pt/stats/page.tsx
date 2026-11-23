"use client";

import "@/lib/banks/nptept";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NptePtStatsPage() {
  return <ExamStatsPage exam={getExamById("nptept")!} />;
}
