"use client";

import "@/lib/banks/phleb";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PhlebTestPage() {
  return <ExamTestPage exam={getExamById("phleb")!} />;
}
