"use client";

import "@/lib/banks/auvic";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AuvicTestPage() {
  return <ExamTestPage exam={getExamById("auvic")!} />;
}
