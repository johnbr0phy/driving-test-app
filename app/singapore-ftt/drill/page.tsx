"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SgfttDrillPage() {
  return <ExamDrillPage exam={getExamById("sgftt")!} />;
}
