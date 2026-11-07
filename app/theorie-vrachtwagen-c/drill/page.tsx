"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BevrachtDrillPage() {
  return <ExamDrillPage exam={getExamById("bevracht")!} />;
}
