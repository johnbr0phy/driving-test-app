"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AbGuardDrillPage() {
  return <ExamDrillPage exam={getExamById("caabguard")!} />;
}
