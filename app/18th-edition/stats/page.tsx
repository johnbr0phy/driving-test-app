"use client";

import "@/lib/banks/uk18ed";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function Uk18edStatsPage() {
  return <ExamStatsPage exam={getExamById("uk18ed")!} />;
}
