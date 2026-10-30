"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CapswDrillPage() {
  return <ExamDrillPage exam={getExamById("capsw")!} />;
}
