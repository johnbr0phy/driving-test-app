"use client";

import "@/lib/banks/mykpp";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function MykppTestPage() {
  return <ExamTestPage exam={getExamById("mykpp")!} />;
}
