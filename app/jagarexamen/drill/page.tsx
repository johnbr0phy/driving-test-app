"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SejaktDrillPage() {
  return <ExamDrillPage exam={getExamById("sejakt")!} />;
}
