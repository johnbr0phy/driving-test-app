"use client";

import "@/lib/banks/zak53";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function Zak53TestPage() {
  return <ExamTestPage exam={getExamById("zak53")!} />;
}
