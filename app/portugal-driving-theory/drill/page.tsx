"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PtimtDrillPage() {
  return <ExamDrillPage exam={getExamById("ptimt")!} />;
}
