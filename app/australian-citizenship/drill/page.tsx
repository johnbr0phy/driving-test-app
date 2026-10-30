"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AucitDrillPage() {
  return <ExamDrillPage exam={getExamById("aucit")!} />;
}
