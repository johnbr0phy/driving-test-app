"use client";

import "@/lib/banks/schoolbus";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function SchoolBusDrillPage() {
  return <ExamDrillPage exam={getExamById("schoolbus")!} />;
}
