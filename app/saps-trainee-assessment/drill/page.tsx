"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ZasapsDrillPage() {
  return <ExamDrillPage exam={getExamById("zasaps")!} />;
}
