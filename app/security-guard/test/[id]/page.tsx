"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SecurityGuardTestPage() {
  return <ExamTestPage exam={getExamById("security")!} />;
}
