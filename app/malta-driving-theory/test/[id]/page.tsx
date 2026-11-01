"use client";

import "@/lib/banks/mttheory";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function MttheoryTestPage() {
  return <ExamTestPage exam={getExamById("mttheory")!} />;
}
