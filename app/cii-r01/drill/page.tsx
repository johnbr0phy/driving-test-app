"use client";

import "@/lib/banks/ukr01";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CiiR01DrillPage() {
  return <ExamDrillPage exam={getExamById("ukr01")!} />;
}
