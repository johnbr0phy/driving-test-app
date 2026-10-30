"use client";

import "@/lib/banks/cask";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaskTestPage() {
  return <ExamTestPage exam={getExamById("cask")!} />;
}
