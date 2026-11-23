"use client";

import "@/lib/banks/cagas3";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GasTech3DrillPage() {
  return <ExamDrillPage exam={getExamById("cagas3")!} />;
}
