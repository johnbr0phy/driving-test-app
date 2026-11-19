"use client";

import "@/lib/banks/r410a";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function R410aDrillPage() {
  return <ExamDrillPage exam={getExamById("r410a")!} />;
}
