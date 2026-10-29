"use client";

import "@/lib/banks/caon";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaonTestPage() {
  return <ExamTestPage exam={getExamById("caon")!} />;
}
