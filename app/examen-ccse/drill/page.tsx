"use client";

import "@/lib/banks/esccse";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function EsccseDrillPage() {
  return <ExamDrillPage exam={getExamById("esccse")!} />;
}
