"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CapalDrillPage() {
  return <ExamDrillPage exam={getExamById("capal")!} />;
}
