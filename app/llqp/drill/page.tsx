"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function LlqpDrillPage() {
  return <ExamDrillPage exam={getExamById("llqp")!} />;
}
