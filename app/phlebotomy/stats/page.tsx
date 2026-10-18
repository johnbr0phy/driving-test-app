"use client";

import "@/lib/banks/phleb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PhlebStatsPage() {
  return <ExamStatsPage exam={getExamById("phleb")!} />;
}
