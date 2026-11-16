"use client";

import "@/lib/banks/iehcap";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IeHcapStatsPage() {
  return <ExamStatsPage exam={getExamById("iehcap")!} />;
}
