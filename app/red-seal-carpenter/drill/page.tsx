"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RedSealCarpenterDrillPage() {
  return <ExamDrillPage exam={getExamById("cacarp")!} />;
}
