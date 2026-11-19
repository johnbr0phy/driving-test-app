"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AscpMlsDrillPage() {
  return <ExamDrillPage exam={getExamById("ascpmls")!} />;
}
