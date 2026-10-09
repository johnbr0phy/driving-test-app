"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function NotaryDrillPage() {
  return <ExamDrillPage exam={getExamById("notary")!} />;
}
