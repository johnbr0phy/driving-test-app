"use client";

import "@/lib/banks/rbt";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function RbtTestPage() {
  return <ExamTestPage exam={getExamById("rbt")!} />;
}
