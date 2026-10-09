"use client";

import { ExamTestPage } from "@/components/exam/ExamTestPage";
import { getExamById } from "@/lib/exams";

export default function AwsTestPage() {
  return <ExamTestPage exam={getExamById("aws")!} />;
}
