"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CprTestPage() {
  return <ExamTestPage exam={getExamById("cpr")!} />;
}
