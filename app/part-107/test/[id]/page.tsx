"use client";

import "@/lib/banks/part107";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function Part107TestPage() {
  return <ExamTestPage exam={getExamById("part107")!} />;
}
