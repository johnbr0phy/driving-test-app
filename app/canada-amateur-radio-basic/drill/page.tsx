"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CahambasicDrillPage() {
  return <ExamDrillPage exam={getExamById("cahambasic")!} />;
}
