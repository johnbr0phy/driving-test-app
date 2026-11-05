"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HkLePaper1DrillPage() {
  return <ExamDrillPage exam={getExamById("hklesfi1")!} />;
}
