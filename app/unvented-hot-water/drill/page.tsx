"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Ukg3DrillPage() {
  return <ExamDrillPage exam={getExamById("ukg3")!} />;
}
