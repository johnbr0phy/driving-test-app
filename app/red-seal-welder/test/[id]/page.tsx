"use client";

import "@/lib/banks/caweld";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CaweldTestPage() {
  return <ExamTestPage exam={getExamById("caweld")!} />;
}
