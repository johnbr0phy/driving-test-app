"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function RedSealPlumberDrillPage() {
  return <ExamDrillPage exam={getExamById("caplumb")!} />;
}
