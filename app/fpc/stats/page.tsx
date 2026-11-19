"use client";

import "@/lib/banks/fpc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FpcStatsPage() {
  return <ExamStatsPage exam={getExamById("fpc")!} />;
}
