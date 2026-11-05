"use client";

import "@/lib/banks/nzheavy";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NzheavyDrillPage() {
  return <ExamDrillPage exam={getExamById("nzheavy")!} />;
}
