"use client";

import "@/lib/banks/hha";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HhaDrillPage() {
  return <ExamDrillPage exam={getExamById("hha")!} />;
}
