"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DanbDrillPage() {
  return <ExamDrillPage exam={getExamById("danb")!} />;
}
