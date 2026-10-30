"use client";

import "@/lib/banks/nzroad";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzroadStatsPage() {
  return <ExamStatsPage exam={getExamById("nzroad")!} />;
}
