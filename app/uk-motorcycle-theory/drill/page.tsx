"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function UkmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("ukmoto")!} />;
}
