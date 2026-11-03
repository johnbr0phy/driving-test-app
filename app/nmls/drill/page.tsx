"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NmlsDrillPage() {
  return <ExamDrillPage exam={getExamById("nmls")!} />;
}
