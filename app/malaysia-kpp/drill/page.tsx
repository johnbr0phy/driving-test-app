"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MykppDrillPage() {
  return <ExamDrillPage exam={getExamById("mykpp")!} />;
}
