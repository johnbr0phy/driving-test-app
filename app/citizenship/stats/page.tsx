"use client";

import "@/lib/banks/civics";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CitizenshipStatsPage() {
  return <ExamStatsPage exam={getExamById("civics")!} />;
}
