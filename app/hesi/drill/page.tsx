"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HesiDrillPage() {
  return <ExamDrillPage exam={getExamById("hesi")!} />;
}
