"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GrdrivingDrillPage() {
  return <ExamDrillPage exam={getExamById("grdriving")!} />;
}
