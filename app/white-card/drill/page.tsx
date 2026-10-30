"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function WhiteCardDrillPage() {
  return <ExamDrillPage exam={getExamById("auwhite")!} />;
}
