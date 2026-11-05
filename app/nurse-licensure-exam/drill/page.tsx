"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhnleDrillPage() {
  return <ExamDrillPage exam={getExamById("phnle")!} />;
}
