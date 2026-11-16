"use client";

import "@/lib/banks/cehrs";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CehrsStatsPage() {
  return <ExamStatsPage exam={getExamById("cehrs")!} />;
}
