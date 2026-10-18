"use client";

import "@/lib/banks/osha";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function OshaStatsPage() {
  return <ExamStatsPage exam={getExamById("osha")!} />;
}
