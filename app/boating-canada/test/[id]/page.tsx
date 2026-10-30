"use client";

import "@/lib/banks/pcoc";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PcocTestPage() {
  return <ExamTestPage exam={getExamById("pcoc")!} />;
}
