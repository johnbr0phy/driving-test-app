"use client";

import "@/lib/banks/iedttcv";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function IedttcvStatsPage() {
  return <ExamStatsPage exam={getExamById("iedttcv")!} />;
}
