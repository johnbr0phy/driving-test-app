"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function Epa608TestPage() {
  return <ExamTestPage exam={getExamById("epa608")!} />;
}
