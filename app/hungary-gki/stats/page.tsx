"use client";

import "@/lib/banks/hugki";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HugkiStatsPage() {
  return <ExamStatsPage exam={getExamById("hugki")!} />;
}
