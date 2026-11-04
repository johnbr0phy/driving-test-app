"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CcsDrillPage() {
  return <ExamDrillPage exam={getExamById("ccs")!} />;
}
