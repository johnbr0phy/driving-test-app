"use client";

import "@/lib/banks/aseg1";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AseG1DrillPage() {
  return <ExamDrillPage exam={getExamById("aseg1")!} />;
}
