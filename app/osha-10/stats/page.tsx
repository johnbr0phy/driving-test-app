"use client";

import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function OshaStatsPage() {
  return <ExamStatsPage exam={getExamById("osha")!} />;
}
