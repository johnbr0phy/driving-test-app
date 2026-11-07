"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DeaevoDrillPage() {
  return <ExamDrillPage exam={getExamById("deaevo")!} />;
}
