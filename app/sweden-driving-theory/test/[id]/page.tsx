"use client";

import "@/lib/banks/setrafik";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SetrafikTestPage() {
  return <ExamTestPage exam={getExamById("setrafik")!} />;
}
