"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HTLTestPage() {
  return <ExamTestPage exam={getExamById("htl")!} />;
}
