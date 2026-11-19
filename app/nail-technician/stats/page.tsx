"use client";

import "@/lib/banks/nailtech";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function NailTechStatsPage() {
  return <ExamStatsPage exam={getExamById("nailtech")!} />;
}
