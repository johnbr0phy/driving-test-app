"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HugkiDrillPage() {
  return <ExamDrillPage exam={getExamById("hugki")!} />;
}
