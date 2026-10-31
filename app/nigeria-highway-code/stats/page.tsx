"use client";

import "@/lib/banks/ngfrsc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NgfrscStatsPage() {
  return <ExamStatsPage exam={getExamById("ngfrsc")!} />;
}
