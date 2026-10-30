"use client";

import "@/lib/banks/caelec";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaelecTestPage() {
  return <ExamTestPage exam={getExamById("caelec")!} />;
}
