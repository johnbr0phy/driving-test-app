"use client";

import "@/lib/banks/ukcar";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkcarTestPage() {
  return <ExamTestPage exam={getExamById("ukcar")!} />;
}
