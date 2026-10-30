"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CpcDrillPage() {
  return <ExamDrillPage exam={getExamById("cpc")!} />;
}
