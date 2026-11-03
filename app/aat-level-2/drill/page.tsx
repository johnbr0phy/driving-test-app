"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AatL2DrillPage() {
  return <ExamDrillPage exam={getExamById("aatl2")!} />;
}
