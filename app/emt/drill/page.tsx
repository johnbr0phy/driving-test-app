"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EmtDrillPage() {
  return <ExamDrillPage exam={getExamById("emt")!} />;
}
