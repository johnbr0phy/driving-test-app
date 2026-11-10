"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhnatDrillPage() {
  return <ExamDrillPage exam={getExamById("phnat")!} />;
}
