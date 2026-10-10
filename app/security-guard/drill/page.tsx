"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SecurityGuardDrillPage() {
  return <ExamDrillPage exam={getExamById("security")!} />;
}
