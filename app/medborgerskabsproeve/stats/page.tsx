"use client";

import "@/lib/banks/dkmedborger";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function DkmedborgerStatsPage() {
  return <ExamStatsPage exam={getExamById("dkmedborger")!} />;
}
