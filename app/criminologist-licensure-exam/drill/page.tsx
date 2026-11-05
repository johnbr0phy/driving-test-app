"use client";

import "@/lib/banks/phcle";
import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhcleDrillPage() {
  return <ExamDrillPage exam={getExamById("phcle")!} />;
}
