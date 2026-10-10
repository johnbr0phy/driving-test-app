"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AlcoholTestPage() {
  return <ExamTestPage exam={getExamById("alcohol")!} />;
}
