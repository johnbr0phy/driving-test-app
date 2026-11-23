"use client";

import "@/lib/banks/atvsafety";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function AtvSafetyDrillPage() {
  return <ExamDrillPage exam={getExamById("atvsafety")!} />;
}
