"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MaceDrillPage() {
  return <ExamDrillPage exam={getExamById("mace")!} />;
}
