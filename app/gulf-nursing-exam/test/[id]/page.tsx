"use client";

import "@/lib/banks/gulfrn";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function GulfrnTestPage() {
  return <ExamTestPage exam={getExamById("gulfrn")!} />;
}
