"use client";

import "@/lib/banks/mypce";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function MypceStatsPage() {
  return <ExamStatsPage exam={getExamById("mypce")!} />;
}
