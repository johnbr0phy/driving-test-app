"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HunterTestPage() {
  return <ExamTestPage exam={getExamById("hunter")!} />;
}
