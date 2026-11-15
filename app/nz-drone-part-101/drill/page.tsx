"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzDroneDrillPage() {
  return <ExamDrillPage exam={getExamById("nzdrone")!} />;
}
