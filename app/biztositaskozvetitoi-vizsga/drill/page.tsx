"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HubiztDrillPage() {
  return <ExamDrillPage exam={getExamById("hubizt")!} />;
}
