"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IiqePaper1DrillPage() {
  return <ExamDrillPage exam={getExamById("hkiiqe1")!} />;
}
