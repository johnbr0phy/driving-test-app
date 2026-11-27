"use client";

import "@/lib/banks/ukif1";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CiiIf1DrillPage() {
  return <ExamDrillPage exam={getExamById("ukif1")!} />;
}
