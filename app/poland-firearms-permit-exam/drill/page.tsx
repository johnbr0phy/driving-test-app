"use client";

import "@/lib/banks/plbron";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PlbronDrillPage() {
  return <ExamDrillPage exam={getExamById("plbron")!} />;
}
