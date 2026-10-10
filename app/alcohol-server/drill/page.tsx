"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AlcoholDrillPage() {
  return <ExamDrillPage exam={getExamById("alcohol")!} />;
}
