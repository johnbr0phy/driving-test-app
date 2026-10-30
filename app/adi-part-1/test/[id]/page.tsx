"use client";

import "@/lib/banks/ukadi";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkadiTestPage() {
  return <ExamTestPage exam={getExamById("ukadi")!} />;
}
