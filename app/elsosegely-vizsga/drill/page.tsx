"use client";

import "@/lib/banks/huelsoseg";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HuelsosegDrillPage() {
  return <ExamDrillPage exam={getExamById("huelsoseg")!} />;
}
