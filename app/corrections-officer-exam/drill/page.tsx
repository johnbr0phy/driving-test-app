"use client";

import "@/lib/banks/corrections";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CorrectionsExamDrillPage() {
  return <ExamDrillPage exam={getExamById("corrections")!} />;
}
