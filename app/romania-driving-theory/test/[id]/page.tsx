"use client";

import "@/lib/banks/rodrpciv";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function RodrpcivTestPage() {
  return <ExamTestPage exam={getExamById("rodrpciv")!} />;
}
