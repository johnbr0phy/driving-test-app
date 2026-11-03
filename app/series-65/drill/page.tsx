"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function Series65DrillPage() {
  return <ExamDrillPage exam={getExamById("series65")!} />;
}
