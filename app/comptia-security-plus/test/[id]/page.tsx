"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function SecplusTestPage() {
  return <ExamTestPage exam={getExamById("secplus")!} />;
}
