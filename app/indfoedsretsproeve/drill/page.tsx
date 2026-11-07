"use client";

import "@/lib/banks/dkindfoed";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DkindfoedDrillPage() {
  return <ExamDrillPage exam={getExamById("dkindfoed")!} />;
}
