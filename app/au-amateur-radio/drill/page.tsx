"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AuhamDrillPage() {
  return <ExamDrillPage exam={getExamById("auham")!} />;
}
