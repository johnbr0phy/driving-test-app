"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DkmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("dkmoto")!} />;
}
