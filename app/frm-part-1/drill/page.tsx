"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FrmPart1DrillPage() {
  return <ExamDrillPage exam={getExamById("frm1")!} />;
}
