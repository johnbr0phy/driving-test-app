"use client";

import "@/lib/banks/natecore";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NateCoreDrillPage() {
  return <ExamDrillPage exam={getExamById("natecore")!} />;
}
