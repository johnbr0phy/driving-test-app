"use client";

import "@/lib/banks/inbde";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function InbdeStatsPage() {
  return <ExamStatsPage exam={getExamById("inbde")!} />;
}
