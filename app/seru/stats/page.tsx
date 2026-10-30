"use client";

import "@/lib/banks/ukseru";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function UkseruStatsPage() {
  return <ExamStatsPage exam={getExamById("ukseru")!} />;
}
