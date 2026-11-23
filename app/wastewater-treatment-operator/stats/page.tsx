"use client";

import "@/lib/banks/wastewaterop";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function WastewaterOpStatsPage() {
  return <ExamStatsPage exam={getExamById("wastewaterop")!} />;
}
