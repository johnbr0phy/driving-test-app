"use client";

import "@/lib/banks/aufss";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AufssTestPage() {
  return <ExamTestPage exam={getExamById("aufss")!} />;
}
