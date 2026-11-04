"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FlAdjusterDrillPage() {
  return <ExamDrillPage exam={getExamById("fladjuster")!} />;
}
