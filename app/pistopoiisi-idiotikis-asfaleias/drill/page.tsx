"use client";

import "@/lib/banks/grsecurity";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GrsecurityDrillPage() {
  return <ExamDrillPage exam={getExamById("grsecurity")!} />;
}
