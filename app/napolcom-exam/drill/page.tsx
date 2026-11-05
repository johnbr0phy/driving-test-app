"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhnapolcomDrillPage() {
  return <ExamDrillPage exam={getExamById("phnapolcom")!} />;
}
