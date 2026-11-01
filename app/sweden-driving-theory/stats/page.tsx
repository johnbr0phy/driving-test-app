"use client";

import "@/lib/banks/setrafik";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function SetrafikStatsPage() {
  return <ExamStatsPage exam={getExamById("setrafik")!} />;
}
