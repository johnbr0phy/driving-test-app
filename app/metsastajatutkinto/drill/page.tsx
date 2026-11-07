"use client";

import "@/lib/banks/fihunt";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FihuntDrillPage() {
  return <ExamDrillPage exam={getExamById("fihunt")!} />;
}
