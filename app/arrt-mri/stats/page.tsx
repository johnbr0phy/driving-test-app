"use client";

import "@/lib/banks/arrtmri";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function ArrtMriStatsPage() {
  return <ExamStatsPage exam={getExamById("arrtmri")!} />;
}
