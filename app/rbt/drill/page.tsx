"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RbtDrillPage() {
  return <ExamDrillPage exam={getExamById("rbt")!} />;
}
