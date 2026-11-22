"use client";

import "@/lib/banks/plcpc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PlcpcDrillPage() {
  return <ExamDrillPage exam={getExamById("plcpc")!} />;
}
