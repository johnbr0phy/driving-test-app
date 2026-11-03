"use client";

import "@/lib/banks/cma";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CmaStatsPage() {
  return <ExamStatsPage exam={getExamById("cma")!} />;
}
