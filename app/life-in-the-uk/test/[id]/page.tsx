"use client";

import "@/lib/banks/uklitu";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UklituTestPage() {
  return <ExamTestPage exam={getExamById("uklitu")!} />;
}
