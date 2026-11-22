"use client";

import "@/lib/banks/nlvca";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NlVcaStatsPage() {
  return <ExamStatsPage exam={getExamById("nlvca")!} />;
}
