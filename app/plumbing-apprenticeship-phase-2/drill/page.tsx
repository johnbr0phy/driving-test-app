"use client";

import "@/lib/banks/ieplumbt2";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function IePlumbT2DrillPage() {
  return <ExamDrillPage exam={getExamById("ieplumbt2")!} />;
}
