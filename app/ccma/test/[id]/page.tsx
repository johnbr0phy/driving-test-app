"use client";

import "@/lib/banks/ccma";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CcmaTestPage() {
  return <ExamTestPage exam={getExamById("ccma")!} />;
}
