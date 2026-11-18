"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NcccoDrillPage() {
  return <ExamDrillPage exam={getExamById("nccco")!} />;
}
