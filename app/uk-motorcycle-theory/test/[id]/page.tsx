"use client";

import "@/lib/banks/ukmoto";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkmotoTestPage() {
  return <ExamTestPage exam={getExamById("ukmoto")!} />;
}
