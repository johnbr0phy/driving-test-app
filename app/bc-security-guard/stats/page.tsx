"use client";

import "@/lib/banks/cabcguard";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function BcGuardStatsPage() {
  return <ExamStatsPage exam={getExamById("cabcguard")!} />;
}
