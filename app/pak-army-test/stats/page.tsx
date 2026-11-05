"use client";

import "@/lib/banks/pakarmy";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PakarmyStatsPage() {
  return <ExamStatsPage exam={getExamById("pakarmy")!} />;
}
