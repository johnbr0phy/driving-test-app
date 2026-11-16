"use client";

import "@/lib/banks/chtheory";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function ChtheoryDrillPage() {
  return <ExamDrillPage exam={getExamById("chtheory")!} />;
}
