"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EscapcondDrillPage() {
  return <ExamDrillPage exam={getExamById("escapcond")!} />;
}
