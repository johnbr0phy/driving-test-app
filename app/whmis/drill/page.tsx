"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CawhmisDrillPage() {
  return <ExamDrillPage exam={getExamById("cawhmis")!} />;
}
