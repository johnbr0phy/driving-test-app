"use client";

import "@/lib/banks/auwhite";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function WhiteCardStatsPage() {
  return <ExamStatsPage exam={getExamById("auwhite")!} />;
}
