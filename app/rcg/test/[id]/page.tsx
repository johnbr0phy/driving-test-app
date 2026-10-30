"use client";

import "@/lib/banks/aurcg";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AurcgTestPage() {
  return <ExamTestPage exam={getExamById("aurcg")!} />;
}
