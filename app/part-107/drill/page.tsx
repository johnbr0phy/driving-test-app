"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Part107DrillPage() {
  return <ExamDrillPage exam={getExamById("part107")!} />;
}
