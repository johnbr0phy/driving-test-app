"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DetheorieDrillPage() {
  return <ExamDrillPage exam={getExamById("detheorie")!} />;
}
