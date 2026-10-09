"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function DanbTestPage() {
  return <ExamTestPage exam={getExamById("danb")!} />;
}
