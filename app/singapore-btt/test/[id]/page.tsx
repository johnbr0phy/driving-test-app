"use client";

import "@/lib/banks/sgbtt";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SgbttTestPage() {
  return <ExamTestPage exam={getExamById("sgbtt")!} />;
}
