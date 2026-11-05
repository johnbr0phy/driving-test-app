"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MypceDrillPage() {
  return <ExamDrillPage exam={getExamById("mypce")!} />;
}
