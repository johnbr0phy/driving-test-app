"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HukreszDrillPage() {
  return <ExamDrillPage exam={getExamById("hukresz")!} />;
}
