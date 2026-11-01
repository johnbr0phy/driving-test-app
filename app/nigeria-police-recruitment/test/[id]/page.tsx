"use client";

import "@/lib/banks/ngpolice";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NgpoliceTestPage() {
  return <ExamTestPage exam={getExamById("ngpolice")!} />;
}
