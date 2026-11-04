"use client";

import "@/lib/banks/nptepta";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NptePtaStatsPage() {
  return <ExamStatsPage exam={getExamById("nptepta")!} />;
}
