"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IeQfaDrillPage() {
  return <ExamDrillPage exam={getExamById("ieqfa")!} />;
}
