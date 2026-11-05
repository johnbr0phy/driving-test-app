"use client";

import "@/lib/banks/phcle";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhcleStatsPage() {
  return <ExamStatsPage exam={getExamById("phcle")!} />;
}
