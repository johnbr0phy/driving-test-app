"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpaFarDrillPage() {
  return <ExamDrillPage exam={getExamById("cpafar")!} />;
}
