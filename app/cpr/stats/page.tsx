"use client";

import "@/lib/banks/cpr";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CprStatsPage() {
  return <ExamStatsPage exam={getExamById("cpr")!} />;
}
