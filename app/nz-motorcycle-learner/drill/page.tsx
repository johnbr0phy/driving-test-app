"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("nzmoto")!} />;
}
