"use client";

import "@/lib/banks/grinsure";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function GrinsureDrillPage() {
  return <ExamDrillPage exam={getExamById("grinsure")!} />;
}
