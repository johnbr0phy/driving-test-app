"use client";

import "@/lib/banks/sie";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SieTestPage() {
  return <ExamTestPage exam={getExamById("sie")!} />;
}
