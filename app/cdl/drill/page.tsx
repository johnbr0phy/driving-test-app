"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CDLDrillPage() {
  return <ExamDrillPage exam={getExamById("cdl")!} />;
}
