"use client";

import "@/lib/banks/civics";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function CitizenshipTestPage() {
  return <ExamTestPage exam={getExamById("civics")!} />;
}
