"use client";

import "@/lib/banks/ukseru";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkseruTestPage() {
  return <ExamTestPage exam={getExamById("ukseru")!} />;
}
