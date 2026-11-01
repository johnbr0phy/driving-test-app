"use client";

import "@/lib/banks/grdriving";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function GrdrivingTestPage() {
  return <ExamTestPage exam={getExamById("grdriving")!} />;
}
