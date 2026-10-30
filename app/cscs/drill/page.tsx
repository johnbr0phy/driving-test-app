"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CscsDrillPage() {
  return <ExamDrillPage exam={getExamById("cscs")!} />;
}
