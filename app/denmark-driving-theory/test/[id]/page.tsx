"use client";

import "@/lib/banks/dkteori";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function DkteoriTestPage() {
  return <ExamTestPage exam={getExamById("dkteori")!} />;
}
