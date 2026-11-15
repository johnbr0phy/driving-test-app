"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BcbaDrillPage() {
  return <ExamDrillPage exam={getExamById("bcba")!} />;
}
