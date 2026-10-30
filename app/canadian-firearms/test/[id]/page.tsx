"use client";

import "@/lib/banks/capal";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CapalTestPage() {
  return <ExamTestPage exam={getExamById("capal")!} />;
}
