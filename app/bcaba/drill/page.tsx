"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function BcabaDrillPage() {
  return <ExamDrillPage exam={getExamById("bcaba")!} />;
}
