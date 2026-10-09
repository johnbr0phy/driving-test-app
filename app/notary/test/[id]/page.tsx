"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NotaryTestPage() {
  return <ExamTestPage exam={getExamById("notary")!} />;
}
