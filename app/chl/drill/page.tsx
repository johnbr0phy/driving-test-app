"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HspaChlDrillPage() {
  return <ExamDrillPage exam={getExamById("hspachl")!} />;
}
