"use client";

import "@/lib/banks/auwah";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AuwahTestPage() {
  return <ExamTestPage exam={getExamById("auwah")!} />;
}
