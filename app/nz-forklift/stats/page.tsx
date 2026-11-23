"use client";

import "@/lib/banks/nzforklift";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NzForkliftStatsPage() {
  return <ExamStatsPage exam={getExamById("nzforklift")!} />;
}
