"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TxAdjusterDrillPage() {
  return <ExamDrillPage exam={getExamById("txadjuster")!} />;
}
