"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RmaDrillPage() {
  return <ExamDrillPage exam={getExamById("rma")!} />;
}
