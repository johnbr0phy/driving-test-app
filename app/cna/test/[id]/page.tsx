"use client";

import "@/lib/banks/cna";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CnaTestPage() {
  return <ExamTestPage exam={getExamById("cna")!} />;
}
