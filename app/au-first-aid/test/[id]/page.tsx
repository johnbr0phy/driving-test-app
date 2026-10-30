"use client";

import "@/lib/banks/aufirstaid";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AuFirstAidTestPage() {
  return <ExamTestPage exam={getExamById("aufirstaid")!} />;
}
