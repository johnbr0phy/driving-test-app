"use client";

import "@/lib/banks/cans";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CansTestPage() {
  return <ExamTestPage exam={getExamById("cans")!} />;
}
