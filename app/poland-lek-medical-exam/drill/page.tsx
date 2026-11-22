"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PllekDrillPage() {
  return <ExamDrillPage exam={getExamById("pllek")!} />;
}
