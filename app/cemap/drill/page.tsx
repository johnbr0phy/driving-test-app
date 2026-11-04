"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CemapDrillPage() {
  return <ExamDrillPage exam={getExamById("cemap")!} />;
}
