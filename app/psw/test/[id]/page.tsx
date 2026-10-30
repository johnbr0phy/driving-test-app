"use client";

import "@/lib/banks/capsw";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CapswTestPage() {
  return <ExamTestPage exam={getExamById("capsw")!} />;
}
