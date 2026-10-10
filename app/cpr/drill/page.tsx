"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CprDrillPage() {
  return <ExamDrillPage exam={getExamById("cpr")!} />;
}
