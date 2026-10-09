"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function TeasTestPage() {
  return <ExamTestPage exam={getExamById("teas")!} />;
}
