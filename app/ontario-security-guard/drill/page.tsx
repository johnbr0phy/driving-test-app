"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CaguardDrillPage() {
  return <ExamDrillPage exam={getExamById("caguard")!} />;
}
