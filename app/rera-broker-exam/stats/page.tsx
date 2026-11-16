"use client";

import "@/lib/banks/aerera";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AeReraStatsPage() {
  return <ExamStatsPage exam={getExamById("aerera")!} />;
}
