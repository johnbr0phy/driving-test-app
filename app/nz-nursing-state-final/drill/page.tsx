"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzsfeDrillPage() {
  return <ExamDrillPage exam={getExamById("nzsfe")!} />;
}
