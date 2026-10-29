"use client";

import "@/lib/banks/caab";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaabTestPage() {
  return <ExamTestPage exam={getExamById("caab")!} />;
}
