"use client";

import "@/lib/banks/uklgv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UklgvStatsPage() {
  return <ExamStatsPage exam={getExamById("uklgv")!} />;
}
