"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AedhapharmDrillPage() {
  return <ExamDrillPage exam={getExamById("aedhapharm")!} />;
}
