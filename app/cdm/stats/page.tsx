"use client";

import "@/lib/banks/cdm";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CdmStatsPage() {
  return <ExamStatsPage exam={getExamById("cdm")!} />;
}
