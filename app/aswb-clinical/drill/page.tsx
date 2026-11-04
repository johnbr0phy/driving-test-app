"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AswbClinDrillPage() {
  return <ExamDrillPage exam={getExamById("aswbclin")!} />;
}
