"use client";

import "@/lib/banks/dispatcher";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DispatcherDrillPage() {
  return <ExamDrillPage exam={getExamById("dispatcher")!} />;
}
