"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CmfasM5DrillPage() {
  return <ExamDrillPage exam={getExamById("sgm5")!} />;
}
