"use client";

import "@/lib/banks/ascpht";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AscpHtStatsPage() {
  return <ExamStatsPage exam={getExamById("ascpht")!} />;
}
