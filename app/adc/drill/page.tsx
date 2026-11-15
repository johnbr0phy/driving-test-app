"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AdcDrillPage() {
  return <ExamDrillPage exam={getExamById("cadc")!} />;
}
