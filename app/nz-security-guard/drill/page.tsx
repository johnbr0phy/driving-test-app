"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzsecurityDrillPage() {
  return <ExamDrillPage exam={getExamById("nzsecurity")!} />;
}
