"use client";

import "@/lib/banks/uklgv";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UklgvTestPage() {
  return <ExamTestPage exam={getExamById("uklgv")!} />;
}
