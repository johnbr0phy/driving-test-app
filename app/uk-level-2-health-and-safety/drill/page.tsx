"use client";

import "@/lib/banks/ukhs2";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkHs2DrillPage() {
  return <ExamDrillPage exam={getExamById("ukhs2")!} />;
}
