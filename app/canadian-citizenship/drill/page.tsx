"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CacitDrillPage() {
  return <ExamDrillPage exam={getExamById("cacit")!} />;
}
