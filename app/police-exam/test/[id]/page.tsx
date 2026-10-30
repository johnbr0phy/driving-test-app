"use client";

import "@/lib/banks/police";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function PoliceTestPage() {
  return <ExamTestPage exam={getExamById("police")!} />;
}
