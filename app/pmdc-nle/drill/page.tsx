"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PknleDrillPage() {
  return <ExamDrillPage exam={getExamById("pknle")!} />;
}
