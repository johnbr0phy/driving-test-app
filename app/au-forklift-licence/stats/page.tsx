"use client";

import "@/lib/banks/auforklift";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AuForkliftStatsPage() {
  return <ExamStatsPage exam={getExamById("auforklift")!} />;
}
