"use client";

import "@/lib/banks/trapper";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function TrapperDrillPage() {
  return <ExamDrillPage exam={getExamById("trapper")!} />;
}
