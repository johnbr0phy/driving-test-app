"use client";

import "@/lib/banks/iedtt";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IedttStatsPage() {
  return <ExamStatsPage exam={getExamById("iedtt")!} />;
}
