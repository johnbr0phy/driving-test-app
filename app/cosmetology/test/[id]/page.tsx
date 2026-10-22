"use client";

import "@/lib/banks/cosmetology";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CosmetologyTestPage() {
  return <ExamTestPage exam={getExamById("cosmetology")!} />;
}
