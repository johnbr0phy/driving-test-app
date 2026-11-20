"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function HamextraDrillPage() {
  return <ExamDrillPage exam={getExamById("hamextra")!} />;
}
