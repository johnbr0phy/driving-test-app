"use client";

import "@/lib/banks/lifeguard";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function LifeguardTestPage() {
  return <ExamTestPage exam={getExamById("lifeguard")!} />;
}
