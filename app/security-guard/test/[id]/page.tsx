"use client";

import "@/lib/banks/security";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SecurityGuardTestPage() {
  return <ExamTestPage exam={getExamById("security")!} />;
}
