"use client";

import "@/lib/banks/dkmedborger";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function DkmedborgerDrillPage() {
  return <ExamDrillPage exam={getExamById("dkmedborger")!} />;
}
