"use client";

import "@/lib/banks/phlet";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PhletTestPage() {
  return <ExamTestPage exam={getExamById("phlet")!} />;
}
