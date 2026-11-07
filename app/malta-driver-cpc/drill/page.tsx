"use client";

import "@/lib/banks/mtcpc";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function MtcpcDrillPage() {
  return <ExamDrillPage exam={getExamById("mtcpc")!} />;
}
