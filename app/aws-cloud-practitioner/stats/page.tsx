"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function AwsStatsPage() {
  return <ExamStatsPage exam={getExamById("aws")!} />;
}
