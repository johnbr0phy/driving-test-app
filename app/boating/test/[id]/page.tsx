"use client";

import "@/lib/banks/boating";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function BoatingTestPage() {
  return <ExamTestPage exam={getExamById("boating")!} />;
}
