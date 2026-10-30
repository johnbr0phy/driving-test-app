"use client";

import "@/lib/banks/caplumb";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function RedSealPlumberStatsPage() {
  return <ExamStatsPage exam={getExamById("caplumb")!} />;
}
