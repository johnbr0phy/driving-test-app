"use client";

import "@/lib/banks/casfa";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CasfaTestPage() {
  return <ExamTestPage exam={getExamById("casfa")!} />;
}
