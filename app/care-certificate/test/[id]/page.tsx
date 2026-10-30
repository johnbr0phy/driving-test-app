"use client";

import "@/lib/banks/ukcare";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkcareTestPage() {
  return <ExamTestPage exam={getExamById("ukcare")!} />;
}
