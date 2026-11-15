"use client";

import "@/lib/banks/cpatcp";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CpaTcpStatsPage() {
  return <ExamStatsPage exam={getExamById("cpatcp")!} />;
}
