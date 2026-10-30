"use client";

import "@/lib/banks/cabc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CabcTestPage() {
  return <ExamTestPage exam={getExamById("cabc")!} />;
}
