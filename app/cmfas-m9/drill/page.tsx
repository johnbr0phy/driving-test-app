"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CmfasM9DrillPage() {
  return <ExamDrillPage exam={getExamById("sgm9")!} />;
}
