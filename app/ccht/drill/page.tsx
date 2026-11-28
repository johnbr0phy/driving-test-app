"use client";

import "@/lib/banks/ccht";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CchtDrillPage() {
  return <ExamDrillPage exam={getExamById("ccht")!} />;
}
