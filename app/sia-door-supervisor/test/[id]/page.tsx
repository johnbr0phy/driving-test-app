"use client";

import "@/lib/banks/uksia";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UksiaTestPage() {
  return <ExamTestPage exam={getExamById("uksia")!} />;
}
