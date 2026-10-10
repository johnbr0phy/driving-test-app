"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function OshaTestPage() {
  return <ExamTestPage exam={getExamById("osha")!} />;
}
