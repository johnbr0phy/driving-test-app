"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NlbromDrillPage() {
  return <ExamDrillPage exam={getExamById("nlbrom")!} />;
}
