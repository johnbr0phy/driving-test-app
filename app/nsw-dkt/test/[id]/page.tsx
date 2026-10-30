"use client";

import "@/lib/banks/aunsw";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AunswTestPage() {
  return <ExamTestPage exam={getExamById("aunsw")!} />;
}
