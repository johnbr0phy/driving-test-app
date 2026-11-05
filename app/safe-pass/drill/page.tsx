"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IeSafePassDrillPage() {
  return <ExamDrillPage exam={getExamById("iesafepass")!} />;
}
