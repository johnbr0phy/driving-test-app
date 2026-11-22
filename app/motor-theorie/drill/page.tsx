"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NlmotoDrillPage() {
  return <ExamDrillPage exam={getExamById("nlmoto")!} />;
}
