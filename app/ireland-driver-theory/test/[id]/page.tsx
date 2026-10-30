"use client";

import "@/lib/banks/iedtt";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function IedttTestPage() {
  return <ExamTestPage exam={getExamById("iedtt")!} />;
}
