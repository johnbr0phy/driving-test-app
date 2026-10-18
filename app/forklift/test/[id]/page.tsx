"use client";

import "@/lib/banks/forklift";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function ForkliftTestPage() {
  return <ExamTestPage exam={getExamById("forklift")!} />;
}
