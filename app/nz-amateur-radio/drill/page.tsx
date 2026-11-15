"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzhamDrillPage() {
  return <ExamDrillPage exam={getExamById("nzham")!} />;
}
