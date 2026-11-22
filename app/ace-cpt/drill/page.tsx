"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AceCptDrillPage() {
  return <ExamDrillPage exam={getExamById("acecpt")!} />;
}
