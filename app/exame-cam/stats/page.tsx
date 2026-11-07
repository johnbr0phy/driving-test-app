"use client";

import "@/lib/banks/ptcam";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function PtcamStatsPage() {
  return <ExamStatsPage exam={getExamById("ptcam")!} />;
}
