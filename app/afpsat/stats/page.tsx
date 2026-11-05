"use client";

import "@/lib/banks/afpsat";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AfpsatStatsPage() {
  return <ExamStatsPage exam={getExamById("afpsat")!} />;
}
