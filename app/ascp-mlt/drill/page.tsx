"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AscpMltDrillPage() {
  return <ExamDrillPage exam={getExamById("ascpmlt")!} />;
}
