"use client";

import "@/lib/banks/inrto";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function InrtoStatsPage() {
  return <ExamStatsPage exam={getExamById("inrto")!} />;
}
