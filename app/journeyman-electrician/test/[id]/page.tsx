"use client";

import "@/lib/banks/jelec";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function JelecTestPage() {
  return <ExamTestPage exam={getExamById("jelec")!} />;
}
