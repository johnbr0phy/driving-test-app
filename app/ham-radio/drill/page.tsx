"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HamDrillPage() {
  return <ExamDrillPage exam={getExamById("ham")!} />;
}
