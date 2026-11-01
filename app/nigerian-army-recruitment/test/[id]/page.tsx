"use client";

import "@/lib/banks/ngarmy";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function NgarmyTestPage() {
  return <ExamTestPage exam={getExamById("ngarmy")!} />;
}
