"use client";

import "@/lib/banks/aursa";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AursaTestPage() {
  return <ExamTestPage exam={getExamById("aursa")!} />;
}
