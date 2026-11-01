"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SetrafikDrillPage() {
  return <ExamDrillPage exam={getExamById("setrafik")!} />;
}
