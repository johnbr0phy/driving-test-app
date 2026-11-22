"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NltheorieDrillPage() {
  return <ExamDrillPage exam={getExamById("nltheorie")!} />;
}
