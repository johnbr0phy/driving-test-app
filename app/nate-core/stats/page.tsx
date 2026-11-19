"use client";

import "@/lib/banks/natecore";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NateCoreStatsPage() {
  return <ExamStatsPage exam={getExamById("natecore")!} />;
}
