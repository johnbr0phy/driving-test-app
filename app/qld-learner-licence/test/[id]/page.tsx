"use client";

import "@/lib/banks/auqld";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AuqldTestPage() {
  return <ExamTestPage exam={getExamById("auqld")!} />;
}
