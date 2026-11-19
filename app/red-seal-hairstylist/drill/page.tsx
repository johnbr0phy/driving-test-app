"use client";

import "@/lib/banks/carshair";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CarshairDrillPage() {
  return <ExamDrillPage exam={getExamById("carshair")!} />;
}
