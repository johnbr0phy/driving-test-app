"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PtcbDrillPage() {
  return <ExamDrillPage exam={getExamById("ptcb")!} />;
}
