"use client";

import "@/lib/banks/ukfaw";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkfawTestPage() {
  return <ExamTestPage exam={getExamById("ukfaw")!} />;
}
