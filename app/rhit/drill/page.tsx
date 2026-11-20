"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RhitDrillPage() {
  return <ExamDrillPage exam={getExamById("rhit")!} />;
}
