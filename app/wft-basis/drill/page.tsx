"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NlwftDrillPage() {
  return <ExamDrillPage exam={getExamById("nlwft")!} />;
}
