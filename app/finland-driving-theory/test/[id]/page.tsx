"use client";

import "@/lib/banks/fitheory";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function FitheoryTestPage() {
  return <ExamTestPage exam={getExamById("fitheory")!} />;
}
