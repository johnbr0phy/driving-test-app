"use client";

import "@/lib/banks/caplumb";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function RedSealPlumberTestPage() {
  return <ExamTestPage exam={getExamById("caplumb")!} />;
}
