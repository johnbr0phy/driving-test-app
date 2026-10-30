"use client";

import "@/lib/banks/caauto";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaautoTestPage() {
  return <ExamTestPage exam={getExamById("caauto")!} />;
}
