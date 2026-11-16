"use client";

import "@/lib/banks/hknurse";
import { ExamStatsPage } from "@/components/exam/ExamStatsPage";
import { getExamById } from "@/lib/exams";

export default function HkNursingStatsPage() {
  return <ExamStatsPage exam={getExamById("hknurse")!} />;
}
