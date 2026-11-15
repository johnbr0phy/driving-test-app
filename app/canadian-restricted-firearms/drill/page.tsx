"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CrfscDrillPage() {
  return <ExamDrillPage exam={getExamById("crfsc")!} />;
}
