"use client";

import "@/lib/banks/cbcs";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CbcsDrillPage() {
  return <ExamDrillPage exam={getExamById("cbcs")!} />;
}
