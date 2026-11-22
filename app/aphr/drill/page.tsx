"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AphrDrillPage() {
  return <ExamDrillPage exam={getExamById("aphr")!} />;
}
