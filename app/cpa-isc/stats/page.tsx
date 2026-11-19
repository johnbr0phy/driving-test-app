"use client";

import "@/lib/banks/cpaisc";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaIscStatsPage() {
  return <ExamStatsPage exam={getExamById("cpaisc")!} />;
}
