"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhmidwifeDrillPage() {
  return <ExamDrillPage exam={getExamById("phmidwife")!} />;
}
