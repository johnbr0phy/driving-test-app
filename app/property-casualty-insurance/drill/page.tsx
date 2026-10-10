"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PncDrillPage() {
  return <ExamDrillPage exam={getExamById("pnc")!} />;
}
