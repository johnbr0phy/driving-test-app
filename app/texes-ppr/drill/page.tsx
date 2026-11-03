"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TexespprDrillPage() {
  return <ExamDrillPage exam={getExamById("texesppr")!} />;
}
