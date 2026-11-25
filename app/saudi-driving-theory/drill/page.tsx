"use client";

import "@/lib/banks/samuroor";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SamuroorDrillPage() {
  return <ExamDrillPage exam={getExamById("samuroor")!} />;
}
