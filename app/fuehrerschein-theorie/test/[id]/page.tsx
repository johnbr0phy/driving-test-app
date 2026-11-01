"use client";

import "@/lib/banks/detheorie";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function DetheorieTestPage() {
  return <ExamTestPage exam={getExamById("detheorie")!} />;
}
