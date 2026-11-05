"use client";

import { ExamDrillPage } from "@/components/exam/ExamDrillPage";
import { getExamById } from "@/lib/exams";

export default function PhpsychomDrillPage() {
  return <ExamDrillPage exam={getExamById("phpsychom")!} />;
}
