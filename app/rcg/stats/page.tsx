"use client";

import "@/lib/banks/aurcg";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AurcgStatsPage() {
  return <ExamStatsPage exam={getExamById("aurcg")!} />;
}
