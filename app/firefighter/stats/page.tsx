"use client";

import "@/lib/banks/ffi";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function FfiStatsPage() {
  return <ExamStatsPage exam={getExamById("ffi")!} />;
}
