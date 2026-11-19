"use client";

import "@/lib/banks/cadronebasic";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function CanadaDroneBasicStatsPage() {
  return <ExamStatsPage exam={getExamById("cadronebasic")!} />;
}
