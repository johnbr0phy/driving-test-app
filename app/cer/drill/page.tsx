"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HspaCerDrillPage() {
  return <ExamDrillPage exam={getExamById("hspacer")!} />;
}
