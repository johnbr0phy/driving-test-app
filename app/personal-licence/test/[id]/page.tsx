"use client";

import "@/lib/banks/ukaplh";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkaplhTestPage() {
  return <ExamTestPage exam={getExamById("ukaplh")!} />;
}
