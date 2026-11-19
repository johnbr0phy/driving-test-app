"use client";

import "@/lib/banks/backflow";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BackflowDrillPage() {
  return <ExamDrillPage exam={getExamById("backflow")!} />;
}
