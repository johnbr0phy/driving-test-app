"use client";

import "@/lib/banks/aerta";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AertaTestPage() {
  return <ExamTestPage exam={getExamById("aerta")!} />;
}
