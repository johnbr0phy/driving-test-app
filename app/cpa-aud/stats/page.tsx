"use client";

import "@/lib/banks/cpaaud";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaAudStatsPage() {
  return <ExamStatsPage exam={getExamById("cpaaud")!} />;
}
