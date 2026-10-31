"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AertaDrillPage() {
  return <ExamDrillPage exam={getExamById("aerta")!} />;
}
