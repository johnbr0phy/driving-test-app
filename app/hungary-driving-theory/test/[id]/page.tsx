"use client";

import "@/lib/banks/hukresz";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function HukreszTestPage() {
  return <ExamTestPage exam={getExamById("hukresz")!} />;
}
