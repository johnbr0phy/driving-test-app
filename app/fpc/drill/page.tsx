"use client";

import "@/lib/banks/fpc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function FpcDrillPage() {
  return <ExamDrillPage exam={getExamById("fpc")!} />;
}
