"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AufssDrillPage() {
  return <ExamDrillPage exam={getExamById("aufss")!} />;
}
