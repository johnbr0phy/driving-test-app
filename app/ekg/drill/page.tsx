"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function CetDrillPage() {
  return <ExamDrillPage exam={getExamById("cet")!} />;
}
