"use client";

import "@/lib/banks/cpb";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpbDrillPage() {
  return <ExamDrillPage exam={getExamById("cpb")!} />;
}
