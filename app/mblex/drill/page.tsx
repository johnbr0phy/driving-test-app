"use client";

import "@/lib/banks/mblex";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MblexDrillPage() {
  return <ExamDrillPage exam={getExamById("mblex")!} />;
}
