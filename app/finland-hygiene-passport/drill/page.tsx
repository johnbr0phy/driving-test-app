"use client";

import "@/lib/banks/fihygiene";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FihygieneDrillPage() {
  return <ExamDrillPage exam={getExamById("fihygiene")!} />;
}
