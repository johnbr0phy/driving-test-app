"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AuqldDrillPage() {
  return <ExamDrillPage exam={getExamById("auqld")!} />;
}
