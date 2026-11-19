"use client";

import "@/lib/banks/ctec";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CtecTaxPreparerDrillPage() {
  return <ExamDrillPage exam={getExamById("ctec")!} />;
}
