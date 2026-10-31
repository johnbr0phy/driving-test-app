"use client";

import "@/lib/banks/kentsa";
import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function KentsaTestPage() {
  return <ExamTestPage exam={getExamById("kentsa")!} />;
}
