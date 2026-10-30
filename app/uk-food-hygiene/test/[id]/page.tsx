"use client";

import "@/lib/banks/ukfood";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function UkfoodTestPage() {
  return <ExamTestPage exam={getExamById("ukfood")!} />;
}
